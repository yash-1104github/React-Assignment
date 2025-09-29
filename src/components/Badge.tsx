import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  color?: "slate" | "blue";
};

export default function Badge({ children, color = "slate" }: BadgeProps) {
  const baseClasses = "px-4 py-1 rounded-full border text-xs";
  const colorClasses = {
    slate: "bg-slate-50 text-slate-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return <span className={`${baseClasses} ${colorClasses[color]}`}>{children}</span>;
}