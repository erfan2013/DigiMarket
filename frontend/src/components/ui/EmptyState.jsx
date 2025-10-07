import React from "react";

export default function EmptyState({ title = "Nothing here", subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 gap-2">
      <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 text-xl">☁️</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-slate-500 max-w-md">{subtitle}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
