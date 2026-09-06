import type { ReactNode } from "react";
import { LMS_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  variant?: "gold" | "ink" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 min-h-11 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const variants = {
  gold: "bg-[var(--electric)] text-[var(--night)] hover:brightness-105 active:scale-[0.98]",
  ink: "bg-[var(--night)] text-white hover:bg-[var(--night-2)] active:scale-[0.98]",
  outline:
    "border border-ink/25 text-ink bg-transparent hover:bg-ink hover:text-ink-foreground active:scale-[0.98]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base",
};

/** Every LMS action on the site routes through this component. */
export function LmsButton({ children, variant = "gold", size = "md", className }: Props) {
  return (
    <a
      href={LMS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  );
}
