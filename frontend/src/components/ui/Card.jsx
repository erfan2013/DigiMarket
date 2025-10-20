import React from "react";
import clsx from "clsx";

export function Card({ className, children }) {
  return (
    <div className={clsx("bg-[var(--surface)] rounded-2xl shadow-sm border border-[var(--surface-border)]", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return <div className={clsx("px-5 py-4 border-b border-[var(--surface-border)]", className)}>{children}</div>;
}

export function CardTitle({ className, children }) {
  return <h3 className={clsx("text-lg font-semibold", className)}>{children}</h3>;
}

export function CardContent({ className, children }) {
  return <div className={clsx("px-5 py-4", className)}>{children}</div>;
}
