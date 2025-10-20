import React from "react";

export default function Licensing() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--surface-2)] py-10 page">
      {/* bg glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-400/20 to-teal-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4">
        <header className="mb-8 appbar">
          <h1 className="text-3xl font-semibold text-[var(--text)]">
            License Agreement
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Terms & usage guidelines for DigiMarket digital products
          </p>
        </header>

        <article className="space-y-6 rounded-3xl border border-white/40 bg-[var(--surface)]/70 p-6 shadow-lg backdrop-blur">
          <Section
            title="Introduction"
            body="Welcome to DigiMarket! By purchasing or using our products, you agree to the terms of this licensing agreement. Please read carefully."
          />
          <Section
            title="License Grant"
            body="You are granted a non-exclusive, non-transferable, revocable license to use the product according to your purchased license type."
            list={[
              "Use for personal or commercial purposes within your license scope",
              "Do not resell, distribute, or sublicense without consent",
              "Do not reverse-engineer or alter the product",
            ]}
          />
          <Section
            title="License Types"
            body="Choose the license that fits your usage:"
            list={[
              "Personal Use: non-commercial projects",
              "Commercial Use: business & profit-making activities",
              "Extended: broader usage, including client sublicensing",
            ]}
          />
          <Section
            title="Prohibited Uses"
            list={[
              "Reselling or redistributing the product",
              "Infringing any intellectual property rights",
              "Unlawful or non-compliant use",
            ]}
          />
          <Section
            title="Intellectual Property"
            body="All products remain the intellectual property of their creators or DigiMarket. You receive usage rightsâ€”not ownership."
          />
          <Section
            title="Term and Termination"
            body="Your license begins at purchase and continues unless terminated due to policy violations."
          />
          <Section
            title="Limitation of Liability"
            body="DigiMarket is not liable for indirect or consequential damages. Liability is limited to the purchase amount."
          />
          <Section
            title="Governing Law"
            body="This agreement follows the applicable laws of DigiMarketâ€™s operating jurisdiction."
          />
          <Section
            title="Contact Us"
            body={
              <>
                For questions, email{" "}
                <a
                  href="mailto:support@digitalmarket.com"
                  className="text-indigo-600 underline"
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

