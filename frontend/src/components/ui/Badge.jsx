import React from "react";
import clsx from "clsx";

export default function Badge({ children, color = "slate", className }) {
  const colors = {
    slate: "bg-[var(--surface-2)] text-[var(--text-muted)]",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    amber: "bg-amber-100 text-amber-800",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", colors[color], className)}>
      {children}
    </span>
  );
}
