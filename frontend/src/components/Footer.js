// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../assest/LOGO.png";

export default function Footer() {
  const year = new Date().getFullYear();

  const onSubscribe = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    if (!email) return;
    // TODO: call your API here
    e.currentTarget.reset();
    alert("Thanks! You’ve been subscribed.");
  };

  return (
    <footer className="border-t border-[var(--surface-border)] bg-[var(--surface)] text-[var(--text)] mt-10">
      {/* Help strip */}
      <div className="bg-[var(--surface-2)] border-b border-[var(--surface-border)]">
        <div className="mx-auto max-w-7xl px-4 py-3 text-center text-sm text-[var(--text-muted)]">
          Need help?{" "}
          <Link
            to="/contact"
            className="font-semibold underline underline-offset-4 hover:text-[var(--text)]"
          >
            Contact support
          </Link>{" "}
          • Mon–Fri, 9:00–18:00
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-6">
          {/* Brand + about */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              {/* در دارک برای دیده‌شدن لوگو: فقط در حالت dark فیلتر شود */}
              <img
                src={LOGO}
                alt="DigiMarket"
                className="h-8 w-auto dark:invert dark:brightness-0"
              />
              <span className="sr-only">DigiMarket</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--text-muted)]">
              DigiMarket is your trusted destination for electronics & lifestyle
              products. Fast shipping, secure checkout, and friendly support.
            </p>

            {/* Payment methods */}
            <div className="mt-6">
              <div className="text-xs font-medium text-[var(--text-muted)]">
                Payment methods
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge>VISA</Badge>
                <Badge>Mastercard</Badge>
                <Badge>AMEX</Badge>
                <Badge>PayPal</Badge>
                <Badge>Stripe</Badge>
              </div>
            </div>
          </div>

          {/* Shop */}
          <nav className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>
                <Link
                  to="/product-category?category=mobile"
                  className="hover:text-[var(--text)]"
                >
                  Mobile
                </Link>
              </li>
              <li>
                <Link
                  to="/product-category?category=laptop"
                  className="hover:text-[var(--text)]"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  to="/product-category?category=watch"
                  className="hover:text-[var(--text)]"
                >
                  Watches
                </Link>
              </li>
              <li>
                <Link
                  to="/product-category?category=accessories"
                  className="hover:text-[var(--text)]"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </nav>

          {/* Help */}
          <nav className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Help
            </h3>
            <ul className="space-y-2 text-sm text-[var(--text-muted)]">
              <li>
                <Link to="/contact" className="hover:text-[var(--text)]">
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-[var(--text)]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/licensing" className="hover:text-[var(--text)]">
                  Licensing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--text)]">
                  About Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide">
              Newsletter
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Get product updates, deals, and tips—straight to your inbox.
            </p>
            <form onSubmit={onSubscribe} className="mt-4 flex w-full max-w-md gap-2">
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="ui-input w-full text-sm"
              />
              <button type="submit" className="btn btn-primary shrink-0 btn-ghost">
                Subscribe
              </button>
            </form>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-3">
              <Social href="https://twitter.com" label="Twitter">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M22 5.8c-.7.3-1.4.5-2.1.6.8-.5 1.3-1.2 1.6-2.1-.7.5-1.6.8-2.4 1-1.4-1.5-3.8-1.3-5 0-1 1-1.3 2.5-.8 3.8-3.1-.2-5.9-1.7-7.8-4-.9 1.6-.4 3.6 1.2 4.7-.6 0-1.2-.2-1.7-.5 0 1.7 1.2 3.2 2.9 3.5-.5.1-1 .2-1.5.1.4 1.4 1.8 2.4 3.4 2.4-1.3 1-2.9 1.6-4.6 1.6H2c1.7 1.1 3.7 1.7 5.8 1.7 7 0 10.9-5.8 10.7-10.9.7-.5 1.3-1.2 1.5-2z" />
                </svg>
              </Social>
              <Social href="https://instagram.com" label="Instagram">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.8a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"/>
                </svg>
              </Social>
              <Social href="https://facebook.com" label="Facebook">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M13 22v-8h3l1-4h-4V7c0-1.1.3-1.8 1.9-1.8H17V2.2C16.7 2.1 15.7 2 14.6 2 11.9 2 10 3.6 10 6.7V10H7v4h3v8h3z"/>
                </svg>
              </Social>
              <Social href="https://youtube.com" label="YouTube">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M23 7.2s-.2-1.6-.8-2.2c-.8-.8-1.7-.8-2.1-.9C17.3 3.8 12 3.8 12 3.8h0s-5.3 0-8.1.3c-.4 0-1.3.1-2.1.9C1.2 5.6 1 7.2 1 7.2S.8 9.1.8 11v2c0 1.9.2 3.8.2 3.8s.2 1.6.8 2.2c.8.8 1.9.8 2.4.9 1.8.2 7.8.3 7.8.3s5.3 0 8.1-.3c.4 0 1.3-.1 2.1-.9.6-.6.8-2.2.8-2.2s.2-1.9.2-3.8v-2c0-1.9-.2-3.8-.2-3.8zM9.8 14.8V8.9l6.1 3-6.1 2.9z"/>
                </svg>
              </Social>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--surface-border)] pt-6 text-sm text-[var(--text-muted)] md:flex-row">
          <p>© {year} DigiMarket. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-[var(--text)]">
              Privacy
            </Link>
            <Link to="/licensing" className="hover:text-[var(--text)]">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-[var(--text)]">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-md border border-[var(--surface-border)] bg-[var(--surface-2)] px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]">
      {children}
    </span>
  );
}

function Social({ href, children, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="rounded-full border border-[var(--surface-border)] p-2 text-[var(--text-muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
    >
      {children}
    </a>
  );
}
