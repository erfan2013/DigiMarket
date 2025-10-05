// backend/utils/email.js
const nodemailer = require("nodemailer");
const { providers, defaultProvider } = require("../config/emailProviders");

/**
 * یک transporter از روی تنظیمات provider می‌سازه
 */
function buildTransporter(p) {
  if (!p) throw new Error("Email provider is not configured");
  const smtp = {
    host: p.host,
    port: Number(p.port || 587),
    secure: !!p.secure, // true برای 465
  };
  if (p.auth?.user) {
    smtp.auth = { user: p.auth.user, pass: p.auth.pass };
  }
  return nodemailer.createTransport(smtp);
}

/**
 * انتخاب provider بر اساس نام یا پیش‌فرض
 */
function pickProvider(name) {
  if (name) {
    const found = providers.find((x) => x.name === name);
    if (!found) throw new Error(`Unknown email provider: ${name}`);
    return found;
  }
  // پیش‌فرض
  const def =
    providers.find((x) => x.name === defaultProvider) || providers[0];
  if (!def) throw new Error("No email providers configured");
  return def;
}

/**
 * ارسال ایمیل
 * opts: { to, subject, html, text, from?, replyTo?, cc?, bcc?, providerName? }
 */
async function sendEmail(opts) {
  const { to, subject, html, text, from, providerName, ...rest } = opts || {};
  if (!to) throw new Error("Missing 'to'");
  if (!subject) throw new Error("Missing 'subject'");
  if (!html && !text) throw new Error("Missing 'html' or 'text'");

  const p = pickProvider(providerName);
  const transporter = buildTransporter(p);

  // from نهایی: اولویت با پارامتر، بعد provider.from
  const finalFrom = from || p.from;
  if (!finalFrom) throw new Error("Missing 'from'");

  // اگر allowlist تعریف شده، from را محدود کن
  if (p.allowedFrom?.length) {
    const addr = (finalFrom.match(/<(.*)>/)?.[1] || finalFrom).trim().toLowerCase();
    const ok = p.allowedFrom.some((rule) => {
      const r = rule.toLowerCase();
      return r.startsWith("@") ? addr.endsWith(r) : addr === r;
    });
    if (!ok) throw new Error(`From address not allowed: ${addr}`);
  }

  // IMPORTANT: ...rest را پاس بده تا replyTo/cc/bcc کار کنند
  const mail = { from: finalFrom, to, subject, text, html, ...rest };
  return transporter.sendMail(mail);
}

/**
 * بررسی سلامت همه‌ی providerها (برای /api/email-health)
 */
async function verifyAll() {
  const out = [];
  for (const p of providers) {
    try {
      const t = buildTransporter(p);
      await t.verify();
      out.push({ name: p.name, ok: true });
    } catch (e) {
      out.push({ name: p.name, ok: false, error: e.message });
    }
  }
  return out;
}

module.exports = { sendEmail, verifyAll };






// const nodemailer = require("nodemailer");
// const { providers, defaultProvider } = require("../config/emailProviders");

// const devMode = process.env.NODE_ENV !== "production" || process.env.EMAIL_DEV_MODE === "true";

// // Cache of nodemailer transporters
// const transporterCache = new Map();

// /**
//  * Build nodemailer transporter from provider config
//  */
// function buildTransport(p) {
//   // Only smtp for now
//   return nodemailer.createTransport({
//     host: p.host,
//     port: Number(p.port || 587),
//     secure: !!p.secure,
//     auth: p.auth ? { user: p.auth.user, pass: p.auth.pass } : undefined,
//     pool: true, // بهتره pool داشته باشیم
//     maxConnections: 5,
//     maxMessages: 100,
//   });
// }

// /**
//  * Return true if a `from` address is allowed for this provider.
//  * Exact match OR domain match like '@yourshop.com'
//  */
// function isFromAllowed(p, from) {
//   if (!from) return false;
//   const allowed = p.allowedFrom || [];
//   const emailAddr = (String(from).match(/<(.*)>/)?.[1]) || String(from).trim();
//   const domain = emailAddr.includes("@") ? emailAddr.slice(emailAddr.indexOf("@")) : "";
//   return allowed.some(rule => rule === emailAddr || (rule.startsWith("@") && rule === domain));
// }

// /**
//  * Choose a provider based on:
//  *  - explicit providerName (if given)
//  *  - otherwise based on allowedFrom matching `from`
//  *  - otherwise default provider
//  */
// function chooseProvider({ providerName, from }) {
//   if (providerName) {
//     const p = providers.find(x => x.name === providerName);
//     if (!p) throw new Error(`Email provider "${providerName}" not found`);
//     if (from && !isFromAllowed(p, from)) {
//       throw new Error(`"from" not allowed by provider "${providerName}"`);
//     }
//     return p;
//   }
//   if (from) {
//     const p = providers.find(x => isFromAllowed(x, from));
//     if (p) return p;
//   }
//   const p = providers.find(x => x.name === defaultProvider) || providers[0];
//   if (!p) throw new Error("No email providers configured");
//   return p;
// }

// /**
//  * Send email
//  * opts: { to, subject, html, text, from?, providerName? }
//  */
// async function sendEmail(opts) {
//   const { to, subject, html, text } = opts;
//   let { from, providerName } = opts;

//   if (!providers.length) {
//     if (devMode) {
//       console.log("[DEV EMAIL] (no providers) →", { to, subject });
//       console.log("TEXT:", text);
//       console.log("HTML:", html);
//       return;
//     }
//     throw new Error("No email providers configured");
//   }

//   const provider = chooseProvider({ providerName, from });

//   // default 'from' if not provided
//   if (!from) from = provider.from;

//   // final safety: ensure from is allowed on chosen provider
//   if (!isFromAllowed(provider, from)) {
//     throw new Error(`"from" ${from} is not allowed for provider "${provider.name}"`);
//   }

//   // cache/get transporter
//   let transporter = transporterCache.get(provider.name);
//   if (!transporter) {
//     transporter = buildTransport(provider);
//     transporterCache.set(provider.name, transporter);
//   }

//   // dev fallback: log only
//   if (devMode && !provider.auth?.user) {
//     console.log(`[DEV EMAIL] provider=${provider.name}`, { from, to, subject });
//     return;
//   }

//   await transporter.sendMail({ from, to, subject, text, html });
// }

// /**
//  * Verify all providers (health check)
//  */
// async function verifyAll() {
//   const results = [];
//   for (const p of providers) {
//     try {
//       let t = transporterCache.get(p.name);
//       if (!t) {
//         t = buildTransport(p);
//         transporterCache.set(p.name, t);
//       }
//       // will throw if misconfigured
//       // some providers block verify; if so, just attempt noop send to self
//       try {
//         await t.verify();
//         results.push({ name: p.name, ok: true });
//       } catch (e) {
//         // fallback try: no-op send to self if from is a real address
//         const addr = (p.from.match(/<(.*)>/)?.[1]) || p.from;
//         try {
//           await t.sendMail({ from: p.from, to: addr, subject: "health", text: "ok" });
//           results.push({ name: p.name, ok: true, note: "verify failed; sendMail ok" });
//         } catch (e2) {
//           results.push({ name: p.name, ok: false, error: e2.message || String(e2) });
//         }
//       }
//     } catch (e) {
//       results.push({ name: p.name, ok: false, error: e.message || String(e) });
//     }
//   }
//   return results;
// }

// module.exports = { sendEmail, verifyAll };
