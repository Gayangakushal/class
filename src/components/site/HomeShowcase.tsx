import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Expand } from "lucide-react";
import { CLASS_CENTRES, STUDENT_RESULTS } from "@/lib/site-data";
import { SampleImage } from "./SampleImage";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        el.classList.add("reveal-enter");
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="showcase-reveal">{children}</div>;
}

export function ClassCentres() {
  return <section id="class-centres" className="centres-section section-x">
    <p className="kicker"><span />PHYSICAL CLASSES</p>
    <h2>Find a class near you.</h2>
    <p className="si showcase-si" lang="si">ඔබට පහසුම නගරයේ class එකට සම්බන්ධ වෙන්න.</p>
    <p className="sample-note">Sample locations only. Confirmed centres and directions will be added here.</p>
    <SampleImage className="physical-cover" src="/images/classes/physical-class.svg" alt="Replaceable illustration of classroom learning" />
    <div className="centres-grid">{CLASS_CENTRES.map(centre => <Reveal key={centre.id}>
      <article className="centre-card">
        <SampleImage src={centre.image} alt={`Replaceable illustration for a sample class centre in ${centre.town}`} />
        <div className="centre-copy">
          {centre.isSample && <small className="sample-label">SAMPLE — UPDATE DETAILS</small>}
          <h3><MapPin size={20} />{centre.town}</h3><p>{centre.name}</p>
          {centre.mapUrl ? <a className="centre-action" href={centre.mapUrl} target="_blank" rel="noopener noreferrer">View Location <ArrowUpRight /></a>
            : <button className="centre-action" disabled aria-label={`${centre.town} location awaiting confirmation`}>Location coming soon <ArrowUpRight /></button>}
        </div>
      </article>
    </Reveal>)}</div>
  </section>;
}

export function StudentResults() {
  return <section id="results" className="results-section section-x">
    <p className="kicker kicker-light"><span />STUDENT RESULTS</p>
    <h2>Hard work, made visible.</h2>
    <p className="si showcase-si" lang="si">පසුගිය විභාගවල අපේ දරුවන් ලබාගත් ජයග්‍රහණ.</p>
    <p className="sample-note">This is a sample results layout. Verified student achievements have not yet been supplied.</p>
    <div className="results-wall">{STUDENT_RESULTS.map((result, i) => <Reveal key={result.id}>
      <Dialog><article className={`result-poster result-poster-${i + 1}`}>
        <small className="sample-label">SAMPLE RESULT — REPLACE BEFORE PUBLISHING</small>
        <DialogTrigger asChild><button className="result-preview" aria-label={`Open sample result poster ${i + 1}`}>
          <img src={result.image} alt="Sample result poster with no verified student information" width={960} height={600} loading="lazy" />
          <Expand size={20} />
        </button></DialogTrigger>
        <h3>{result.studentName}</h3><p>{result.year} · {result.result}</p>
      </article><DialogContent className="result-lightbox">
        <DialogTitle>Sample result poster</DialogTitle>
        <DialogDescription>SAMPLE RESULT — REPLACE BEFORE PUBLISHING. No student identity or achievement is claimed.</DialogDescription>
        <img src={result.image} alt="Replaceable sample result artwork" width={960} height={600} />
      </DialogContent></Dialog>
    </Reveal>)}</div>
    <div className="results-cta"><p className="si" lang="si">ඊළඟ ජයග්‍රහණය ඔබේ වෙන්න පුළුවන්.</p><Link to="/classes" className="button-electric">Join the Next Batch <ArrowUpRight size={20} /></Link></div>
  </section>;
}
