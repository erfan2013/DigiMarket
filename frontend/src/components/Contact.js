import React, { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill out all required fields.");
      return;
    }
    // simulate success
    setStatus("Your message has been sent. Thank you for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  const isSuccess = status.includes("sent");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--surface-2)] py-10 page">
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-24 right-1/3 h-72 w-72 translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-400/20 to-teal-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        <header className="mb-8 text-center appbar">
          <h1 className="text-3xl font-semibold text-[var(--text)]">Contact</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            We usually reply within 1â€“2 business days
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {/* info panel */}
          <aside className="md:col-span-2sidebarsidebarsidebar">
            <div className="rounded-3xl border border-white/40 bg-[var(--surface)]/70 p-6 shadow-lg backdrop-blur">
              <h2 className="text-lg font-medium text-[var(--text)] section-title">
                Get in touch
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Have a question about products, orders, or partnerships? Drop us
                a line.
              </p>

              <div className="mt-5 space-y-3 text-sm">
                <div className="rounded-2xl bg-[var(--surface)]/60 p-3 shadow-sm ring-1 ring-black/5">
                  <div className="text-[var(--text-muted)]">Email</div>
                  <a
                    href="mailto:support@digitalmarket.com"
                    className="font-medium text-indigo-600 underline"
                  >
                    support@digitalmarket.com
                  </a>
                </div>
                <div className="rounded-2xl bg-[var(--surface)]/60 p-3 shadow-sm ring-1 ring-black/5">
                  <div className="text-[var(--text-muted)]">Office</div>
                  <div className="font-medium text-[var(--text-muted)]">
                    123 Market Ave, Suite 5, Tech City
                  </div>
                </div>
                <div className="rounded-2xl bg-[var(--surface)]/60 p-3 shadow-sm ring-1 ring-black/5">
                  <div className="text-[var(--text-muted)]">Hours</div>
                  <div className="font-medium text-[var(--text-muted)]">
                    Monâ€“Fri, 9:00â€“18:00
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* form panel */}
          <section className="md:col-span-3">
            <div className="rounded-3xl border border-white/40 bg-[var(--surface)]/70 p-6 shadow-lg backdrop-blur">
              <h2 className="text-lg font-medium text-[var(--text)] section-title">Send a message</h2>

              {status && (
                <div
                  className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
                    isSuccess
                      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                  }`}
                >
                  {status}
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-5 grid gap-4">
                <label className="grid gap-1">
                  <span className="text-xs text-[var(--text-muted)]">Your name</span>
                  <input
                    className="rounded-2xl border-white/40 bg-[var(--surface)]/60 px-4 py-3 text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 ui-input"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="John Doe"
                    required
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-xs text-[var(--text-muted)]">Your email</span>
                  <input
                    type="email"
                    className="rounded-2xl border-white/40 bg-[var(--surface)]/60 px-4 py-3 text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 ui-input"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-xs text-[var(--text-muted)]">Message</span>
                  <textarea
                    className="min-h-[120px] resize-y rounded-2xl border-white/40 bg-[var(--surface)]/60 px-4 py-3 text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 ui-input"
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="Write your messageâ€¦"
                    required
                  />
                </label>

                <button className="mt-2 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-fuchsia-500 px-5 py-3 font-medium text-white shadow-lg shadow-indigo-900/20 transition hover:brightness-110 btn btn-ghost">
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}



