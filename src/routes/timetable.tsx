import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock3 } from "lucide-react";
import { LmsButton } from "@/components/site/LmsButton";
import { Editable, PageHero } from "@/components/site/PageHero";
import { TIMETABLE, CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/timetable")({
  head: () => ({
    meta: [
      { title: "Class Timetable — A/L Business Studies" },
      {
        name: "description",
        content:
          "Weekly A/L Business Studies class timetable by hall and batch, including online sessions.",
      },
      { property: "og:title", content: "Class Timetable — A/L Business Studies" },
      {
        property: "og:description",
        content: "Weekly class timetable by hall and batch, including online sessions.",
      },
    ],
  }),
  component: Timetable,
});

function Timetable() {
  return (
    <div className="inner-page">
      <PageHero
        eyebrow="Weekly rhythm / Timetable"
        number="03"
        title="Make room for your next chapter."
        sinhala="පන්ති කාලසටහන"
        lead="Find your batch, choose your mode and plan your week. Venue details, days and times await confirmation."
      />
      <section className="section-x timetable-content">
        <div className="section-heading">
          <p className="kicker">
            <span />
            WHERE WE MEET
          </p>
          <h2>Your class. Your rhythm.</h2>
        </div>
        <div className="schedule-grid inner-schedule">
          {TIMETABLE.map((v, i) => (
            <article key={v.venue} className="venue-card">
              <header>
                <div>
                  <span className="venue-index">VENUE / 0{i + 1}</span>
                  <h2>{v.venue}</h2>
                  <p>
                    <MapPin aria-hidden="true" />
                    {v.location}
                  </p>
                </div>
                <span className="mode-chip">{v.mode}</span>
              </header>
              <ul>
                {v.rows.map((r, j) => (
                  <li className="timetable-row" key={j}>
                    <h3>
                      <span aria-hidden="true" />
                      {r.batch}
                    </h3>
                    <div>
                      <p>
                        <span>Day</span>
                        <Editable value={r.day} />
                      </p>
                      <p>
                        <span>
                          <Clock3 size={16} aria-hidden="true" /> Time
                        </span>
                        <Editable value={r.time} />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <aside className="schedule-notice">
          <span className="notice-mark" aria-hidden="true">
            !
          </span>
          <div>
            <h2>Before you register</h2>
            <p lang="si" className="si">
              Class schedule එක වෙනස් විය හැකි බැවින් register වීමට පෙර WhatsApp මඟින් confirm
              කරන්න.
            </p>
            <p>Schedules may change. Please confirm via WhatsApp before registering.</p>
            <p className="mt-3">{CONTACT.whatsapp}</p>
          </div>
        </aside>
      </section>
      <section className="inner-lms">
        <div className="section-x">
          <div>
            <p className="kicker kicker-light">
              <span />
              ONLINE / STUDENT LMS
            </p>
            <h2>
              A classroom
              <br />
              wherever you are.
            </h2>
            <p lang="si" className="si">
              Online පාඨමාලා පිළිබඳ විස්තර LMS එකෙන් බලන්න.
            </p>
          </div>
          <LmsButton size="lg">Browse Revision Courses</LmsButton>
        </div>
      </section>
    </div>
  );
}
