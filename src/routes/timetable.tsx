import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { TimetableShowcase } from "@/components/site/TimetableShowcase";

export const Route = createFileRoute("/timetable")({
  head: () => ({
    meta: [
      { title: "2027 A/L Business Studies — Class Timetable" },
      {
        name: "description",
        content: "2027 A/L Business Studies physical and online class timetable.",
      },
      {
        property: "og:title",
        content: "2027 A/L Business Studies — Class Timetable",
      },
      {
        property: "og:description",
        content: "2027 A/L Business Studies physical and online class timetable.",
      },
    ],
  }),
  component: Timetable,
});

function Timetable() {
  return (
    <div className="inner-page timetable-page">
      <PageHero eyebrow="2027 A/L Business Studies" number="27" title="Class Timetable" />
      <main className="timetable-content">
        <TimetableShowcase />
      </main>
    </div>
  );
}
