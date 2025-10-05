// backend/config/emailProviders.js
function parseJSONEnv(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
}

function parseSMTPSeries() {
  const list = [];
  for (let i = 1; i <= 10; i++) {
    const P = `SMTP${i}_`;
    const name = process.env[`${P}NAME`];
    if (!name) continue;

    const host = process.env[`${P}HOST`];
    const port = Number(process.env[`${P}PORT`] || 587);
    const secure = String(process.env[`${P}SECURE`] || "false").toLowerCase() === "true";
    const user = process.env[`${P}USER`];
    const pass = process.env[`${P}PASS`];
    const from = process.env[`${P}FROM`] || "";
    const allowedFrom = (process.env[`${P}ALLOWED_FROM`] || "")
      .split(",").map(s => s.trim()).filter(Boolean);

    list.push({
      name,
      type: "smtp",
      host,
      port,
      secure,
      auth: user ? { user, pass } : undefined,
      from,
      allowedFrom,
    });
  }
  return list;
}

let providers = parseJSONEnv("EMAIL_PROVIDERS", []);
if (!providers.length) {
  providers = parseSMTPSeries();
}

const defaultProvider = process.env.EMAIL_DEFAULT_PROVIDER || (providers[0]?.name || "");

module.exports = { providers, defaultProvider };
