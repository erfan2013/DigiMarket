import React from "react";
import clsx from "clsx";

export default function Skeleton({ className }) {
  return (
    <div className={clsx("animate-pulse rounded-xl bg-[var(--surface-2)]/70", className)} />
  );
}
