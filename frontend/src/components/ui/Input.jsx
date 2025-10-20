import React from "react";
import clsx from "clsx";

export default function Input({
  label,
  error,
  className,
  inputClassName,
  ...props
}) {
  return (
    <label className={clsx("grid gap-1", className)}>
      {label && <span className="text-sm text-[var(--text-muted)]">{label}</span>}
      <input
        className={clsx(
          "h-10 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-3 text-sm outline-none",
          "focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
          error && "border-red-400 focus:ring-red-300 focus:border-red-400",
          inputClassName
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
