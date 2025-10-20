import React from "react";
import Button from "./Button";

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-[var(--surface)] rounded-2xl shadow-xl">
          <div className="px-5 py-4 border-b border-[var(--surface-border)] flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-muted)] btn btn-ghost">✕</button>
          </div>
          <div className="px-5 py-4">{children}</div>
          <div className="px-5 py-4 border-t border-[var(--surface-border)] flex items-center justify-end gap-2">
            {footer || <Button variant="secondary" onClick={onClose}>Close</Button>}
          </div>
        </div>
      </div>
    </div>
  );
}
