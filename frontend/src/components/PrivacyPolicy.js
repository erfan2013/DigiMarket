import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--surface-2)] py-10 page">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-blue-400/20 to-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4">
        <header className="mb-8 appbar">
          <h1 className="text-3xl font-semibold text-[var(--text)]">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            How DigiMarket collects, uses, and protects your data
          </p>
        </header>

        <article className="space-y-6 rounded-3xl border border-white/40 bg-[var(--surface)]/70 p-6 shadow-lg backdrop-blur">
          <Section
            title="Introduction"
            body="We value your privacy and are committed to protecting your personal information."
          />
          <Section
            title="Information We Collect"
            body="We may collect:"
            list={[
              "Personal details (name, email, etc.)",
              "Payment & billing information",
              "Usage data (browsing activity, device info, etc.)",
            ]}
          />
          <Section
            title="How We Use Your Information"
            list={[
              "Process and manage transactions",
              "Personalize your experience",
              "Send updates, promotions, and communications",
              "Improve our services and website",
            ]}
          />
          <Section
            title="How We Protect Your Information"
            body="We implement industry-standard measures to protect your data from unauthorized access or disclosure."
          />
          <Section
            title="Third-Party Services"
            body="We may share information with trusted providers (payments, analytics, email). They are bound to confidentiality."
          />
          <Section
            title="Your Rights"
            body="You can access, correct, or delete your data, and opt-out of marketing communications."
          />
          <Section
            title="Changes to This Policy"
            body="We may update this policy. Changes will be posted on this page with an updated effective date."
          />
          <Section
            title="Contact Us"
            body={
              <>
                Questions? Email{" "}
                <a
                  className="text-indigo-600 underline"
                  href="mailto:support@digitalmarket.com"
                >
                  support@digitalmarket.com
                </a>
                .
              </>
            }
          />
        </article>
      </div>
    </main>
  );
}

function Section({ title, body, list }) {
  return (
    <section className="rounded-2xl bg-[var(--surface)]/60 p-4 shadow-sm ring-1 ring-black/5">
      <h2 className="text-xl font-semibold text-[var(--text)] section-title">{title}</h2>
      {body && <p className="mt-2 text-[var(--text-muted)]">{body}</p>}
      {Array.isArray(list) && list.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-[var(--text-muted)]">
          {list.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

