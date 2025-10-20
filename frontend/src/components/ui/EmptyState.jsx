import React from "react";

export default function EmptyState({ title = "Nothing here", subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 gap-2">
      <div className="h-14 w-14 rounded-2xl bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-muted)] text-xl">☁️</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-[var(--text-muted)] max-w-md">{subtitle}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
