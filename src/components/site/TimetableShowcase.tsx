import {
  BarChart3,
  BookOpenCheck,
  Building2,
  CalendarDays,
  Clock3,
  FileCheck2,
  GraduationCap,
  MapPin,
  Monitor,
  MessageCircle,
  RefreshCcw,
  Target,
} from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site-data";

const CLASSES = [
  {
    day: "Monday",
    time: "8.00 AM – 2.00 PM",
    type: "Physical",
    location: "Kurunegala – Pencil Opera",
  },
  {
    day: "Wednesday",
    time: "8.00 AM – 2.00 PM",
    type: "Physical",
    location: "Kandy – NITROMA",
  },
  {
    day: "Thursday",
    time: "7.00 PM – 10.00 PM",
    type: "Online",
    location: "Online – මුළු ලංකාවටම",
  },
  {
    day: "Sunday",
    time: "7.00 PM – 9.00 PM",
    type: "Online",
    location: "Online – මුළු ලංකාවටම",
  },
] as const;

const HIGHLIGHTS = [
  { title: "2027 Revision", icon: RefreshCcw },
  { title: "Theory", icon: BookOpenCheck },
  { title: "0–100 Revision", icon: Target },
  { title: "1st Shy / 2nd Shy Online", icon: GraduationCap },
  { title: "Full Paper Practice", icon: FileCheck2 },
  { title: "MCQ & Ranking Practice", icon: BarChart3 },
] as const;

export function TimetableShowcase() {
  return (
    <div className="timetable-showcase">
      <section
        id="timetable"
        className="section-x timetable-board"
        aria-labelledby="timetable-heading"
      >
        <div className="timetable-section-heading">
          <p className="kicker">
            <span />
            WEEKLY SCHEDULE
          </p>
          <h2 id="timetable-heading">
            2027 A/L Business Studies
            <span>Class Timetable</span>
          </h2>
        </div>

        <a className="timetable-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle aria-hidden="true" /> Need help choosing a class? Chat on WhatsApp
        </a>

        <div className="class-card-grid">
          {CLASSES.map((classItem, index) => {
            const isOnline = classItem.type === "Online";
            const ModeIcon = isOnline ? Monitor : Building2;

            return (
              <article
                key={classItem.day}
                className={`class-time-card ${isOnline ? "class-time-card-online" : "class-time-card-physical"}`}
              >
                <div className="class-card-topline">
                  <span className="class-card-number">0{index + 1}</span>
                  <span className="class-mode-badge">
                    <ModeIcon aria-hidden="true" />
                    {classItem.type} class
                  </span>
                </div>

                <div className="class-day-row">
                  <span className="class-day-icon" aria-hidden="true">
                    <CalendarDays />
                  </span>
                  <h3>{classItem.day}</h3>
                </div>

                <dl className="class-card-details">
                  <div>
                    <dt>
                      <Clock3 aria-hidden="true" /> Time
                    </dt>
                    <dd>{classItem.time}</dd>
                  </div>
                  <div>
                    <dt>
                      {isOnline ? <Monitor aria-hidden="true" /> : <MapPin aria-hidden="true" />}
                      {isOnline ? "Mode" : "Location"}
                    </dt>
                    <dd lang={isOnline ? "si" : undefined}>{classItem.location}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>

      <section className="class-highlights" aria-labelledby="highlights-heading">
        <div className="section-x">
          <div className="highlights-heading">
            <p className="kicker kicker-light">
              <span />
              WHAT’S INCLUDED
            </p>
            <h2 id="highlights-heading">Class Highlights</h2>
          </div>

          <div className="highlight-card-grid">
            {HIGHLIGHTS.map(({ title, icon: Icon }, index) => (
              <article className="highlight-card" key={title}>
                <span className="highlight-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <span className="highlight-number">0{index + 1}</span>
                  <h3>{title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
