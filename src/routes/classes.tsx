import { SampleImage } from "@/components/site/SampleImage";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { LmsButton } from "@/components/site/LmsButton";
import { Editable, PageHero } from "@/components/site/PageHero";
import { CLASSES, TEACHER_PORTRAIT } from "@/lib/site-data";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Classes & Fees — A/L Business Studies" },
      {
        name: "description",
        content:
          "Theory, revision and paper classes for A/L Business Studies, with what each class includes and its fee.",
      },
      { property: "og:title", content: "Classes & Fees — A/L Business Studies" },
      {
        property: "og:description",
        content: "Theory, revision and paper classes, what each includes, and the monthly fee.",
      },
    ],
  }),
  component: Classes,
});

function Classes() {
  return (
    <div className="inner-page">
      <PageHero
        eyebrow="Programmes / Classes & fees"
        number="02"
        portrait={TEACHER_PORTRAIT}
        title="Your next move starts here."
        sinhala="ඔබේ විභාග වර්ෂයට ගැළපෙන පන්තිය තෝරන්න."
        lead="Theory, revision or paper practice. Choose the programme for your stage of the journey. Fees await confirmation."
      />
      <section className="class-programmes">
        <div className="section-x">
          <div className="programme-intro">
            <p className="kicker kicker-light">
              <span />
              ADMISSION / A/L BUSINESS STUDIES
            </p>
            <p>Three routes to a clearer understanding.</p>
          </div>
          <div className="programme-stack">
            {CLASSES.map((c, i) => (
              <article key={c.id} id={c.id} className={`programme-ticket ticket-${i + 1}`}>
                <div className="programme-number">
                  <span>ADMIT / BS</span>
                  <b>0{i + 1}</b>
                </div>
                <div className="programme-body"><SampleImage src={c.image} alt={`Sri Lankan students attending a ${c.title.toLowerCase()}`} />
                  <span className="ticket-year">{c.year}</span>
                  <h2>{c.title}</h2>
                  <p lang="si" className="si">
                    {c.si}
                  </p>
                  <p className="programme-blurb">{c.blurb}</p>
                  <ul>
                    {c.points.map((p) => (
                      <li key={p}>
                        <Check size={18} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="programme-pass">
                  <p className="kicker">Monthly fee</p>
                  <p>
                    <Editable value={c.fee} />
                  </p>
                  <LmsButton variant="ink">Join via LMS</LmsButton>
                  <Link to="/timetable" className="programme-link">
                    View Timetable <span aria-hidden="true">↗</span>
                  </Link>
                  <span className="ticket-barcode" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
          <p className="programme-note">
            All LMS actions open the revision course catalogue. Confirm availability and fees for
            your selected class before registering.
          </p>
        </div>
      </section>
    </div>
  );
}
