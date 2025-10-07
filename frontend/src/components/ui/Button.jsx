import React from "react";
import clsx from "clsx";

const base =
  "inline-flex items-center justify-center rounded-2xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
  secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-300",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-300",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
};

export default function Button({
  as: Comp = "button",
  size = "md",
  variant = "primary",
  className,
  ...props
}) {
  return (
    <Comp
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
