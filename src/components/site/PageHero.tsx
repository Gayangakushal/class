import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowDownRight } from "lucide-react";
type Props = { eyebrow: string; title: string; sinhala?: string; lead?: string; number?: string; portrait?: string };
export function PageHero({ eyebrow, title, sinhala, lead, number = "01", portrait }: Props) {
  return (
    <section className="page-hero">
      <div className="hero-grid" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      <span className="page-number" aria-hidden="true">
        {number}
      </span>
      <div className={`section-x page-hero-copy${portrait ? " page-hero-with-portrait" : ""}`}>
        <div>
        <Link to="/" className="home-link">
          <ArrowLeft size={16} /> Back to home
        </Link>
        <p className="kicker kicker-light">
          <span />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        {sinhala && (
          <p lang="si" className="si page-sinhala">
            {sinhala}
          </p>
        )}
        {lead && <p className="page-lead">{lead}</p>}
        <ArrowDownRight className="page-accent" aria-hidden="true" />
        </div>
        {portrait && <img className="page-teacher-photo" src={portrait} alt="Deshan Pathinayake, A/L Business Studies teacher" width={1024} height={1536} fetchPriority="high" />}
      </div>
    </section>
  );
}
export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="content-placeholder">{children}</span>;
}
export function Editable({ value }: { value: string }) {
  return value.trim().startsWith("[") ? <Placeholder>{value}</Placeholder> : <>{value}</>;
}
