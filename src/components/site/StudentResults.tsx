import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from "lucide-react";
import { STUDENT_RESULTS } from "@/lib/site-data";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "./HomeShowcase";

type StudentResult = (typeof STUDENT_RESULTS)[number];

function ResultCard({
  result,
  index,
  featured,
  onOpen,
}: {
  result: StudentResult;
  index: number;
  featured: boolean;
  onOpen: () => void;
}) {
  return (
    <article
      className={`result-card${featured ? ` result-card-featured result-card-featured-${index + 1}` : ""}`}
    >
      <button
        className="result-preview"
        type="button"
        onClick={onOpen}
        aria-label={`View complete ${result.district} 2025 results artwork`}
      >
        <img
          src={result.image}
          alt={`${result.district} district 2025 Business Studies best results`}
          width={1600}
          height={1600}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="result-expand" aria-hidden="true">
          <Expand />
        </span>
      </button>
      <div className="result-card-meta">
        <div>
          <h3>{result.district}</h3>
          <p>{result.year} Best Results</p>
        </div>
        <button type="button" onClick={onOpen} aria-label={`View ${result.district} result`}>
          View Result <ArrowUpRight aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export function StudentResults() {
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleResults = showAll
    ? STUDENT_RESULTS
    : STUDENT_RESULTS.filter((result) => result.featured);
  const activeResult = activeIndex === null ? null : STUDENT_RESULTS[activeIndex];

  const moveLightbox = (direction: -1 | 1) => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current + direction + STUDENT_RESULTS.length) % STUDENT_RESULTS.length,
    );
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <section id="results" className="results-section" aria-labelledby="results-heading">
      <div className="section-x">
        <p className="kicker kicker-light">
          <span />
          STUDENT RESULTS
        </p>
        <div className="results-heading-row">
          <div>
            <h2 id="results-heading">Hard work, made visible.</h2>
            <p className="si showcase-si" lang="si">
              ප්‍රතිඵල කියන්නේ අපේ දරුවන්ගේ කැපවීමේ සැබෑ සාක්ෂිය.
            </p>
          </div>
          <p className="results-supporting-copy">
            Celebrating the outstanding achievements of our Business Studies students across Sri
            Lanka.
          </p>
        </div>

        <div className={showAll ? "results-gallery" : "results-featured"}>
          {visibleResults.map((result) => {
            const globalIndex = STUDENT_RESULTS.findIndex((item) => item.id === result.id);
            return (
              <Reveal key={result.id}>
                <ResultCard
                  result={result}
                  index={globalIndex}
                  featured={!showAll}
                  onOpen={() => setActiveIndex(globalIndex)}
                />
              </Reveal>
            );
          })}
        </div>

        <div className="results-toggle-wrap">
          <button
            className="results-toggle button-electric"
            type="button"
            onClick={() => setShowAll((current) => !current)}
            aria-expanded={showAll}
          >
            {showAll ? "Show Featured Results" : "View All 2025 Results"}
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
      >
        {activeResult && (
          <DialogContent className="result-lightbox">
            <DialogTitle className="sr-only">
              {activeResult.district} 2025 Business Studies results
            </DialogTitle>
            <DialogDescription className="sr-only">
              Complete uncropped student result artwork. Use the previous and next buttons or
              keyboard arrow keys to browse.
            </DialogDescription>
            <button
              className="result-lightbox-nav result-lightbox-prev"
              type="button"
              onClick={() => moveLightbox(-1)}
              aria-label="Previous result"
            >
              <ArrowLeft />
            </button>
            <figure>
              <img
                src={activeResult.image}
                alt={`${activeResult.district} district 2025 Business Studies best results`}
                width={1600}
                height={1600}
              />
              <figcaption>
                <strong>{activeResult.district}</strong>
                <span>{activeResult.year} Best Results</span>
              </figcaption>
            </figure>
            <button
              className="result-lightbox-nav result-lightbox-next"
              type="button"
              onClick={() => moveLightbox(1)}
              aria-label="Next result"
            >
              <ArrowRight />
            </button>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
