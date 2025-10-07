import React from "react";
import clsx from "clsx";

export default function Skeleton({ className }) {
  return (
    <div className={clsx("animate-pulse rounded-xl bg-slate-200/70", className)} />
  );
}
