import { createFileRoute } from "@tanstack/react-router";
import { TEACHER_PORTRAIT } from "@/lib/site-data";
import { LmsButton } from "@/components/site/LmsButton";
import { Editable, PageHero } from "@/components/site/PageHero";
import { TEACHER } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Deshan Pathinayake — A/L Business Studies" },
      {
        name: "description",
        content:
          "Who teaches the class: background, teaching method and what an A/L Business Studies student can expect.",
      },
      { property: "og:title", content: "About Deshan Pathinayake — A/L Business Studies" },
      {
        property: "og:description",
        content: "Background, teaching method and what students can expect in class.",
      },
    ],
  }),
  component: About,
});

const METHOD = [
  {
    title: "Concept before question",
    body: "Every unit starts with the idea itself — in plain Sinhala and English — before a single past paper question appears.",
  },
  {
    title: "Written from week one",
    body: "Students write structured answers from the first week, so essay discipline is a habit, not a last-month panic.",
  },
  {
    title: "Marked to the scheme",
    body: "Answers are marked the way the examiner marks them, and the reason for every lost mark is explained.",
  },
  {
    title: "Review and improve",
    body: "Review what you understand, identify gaps and plan the next step in your learning.",
  },
];

function About() {
  return (
    <div className="inner-page">
      <PageHero
        eyebrow="The teacher / About"
        number="01"
        title="A sharper way to think."
        sinhala="ගුරුතුමා ගැන"
        lead="Meet Deshan Pathinayake. Explore the thinking behind the Business Studies classroom."
      />
      <section className="teacher-story about-story">
        <div className="section-x story-grid">
          <div className="story-portrait">
            <span className="story-word" aria-hidden="true">
              DESHAN
            </span>
            <img
              src={TEACHER_PORTRAIT}
              alt="Deshan Pathinayake, A/L Business Studies teacher"
              width={1024}
              height={1536}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="story-copy">
            <p className="kicker kicker-light">
              <span />
              MEET YOUR TEACHER
            </p>
            <h2>
              Deshan
              <br />
              <em>Pathinayake.</em>
            </h2>
            <p className="story-subject">A/L BUSINESS STUDIES</p>
            <p className="mt-6">
              <Editable value="[Verified English biography to be supplied.]" />
            </p>
            <p lang="si" className="si mt-5">
              <Editable value="[සිංහල හැඳින්වීමේ ඡේදය මෙහි එක් කරන්න.]" />
            </p>
          </div>
        </div>
      </section>
      <section className="credentials-strip">
        <dl className="section-x">
          <div>
            <dt>01 / Qualifications</dt>
            <dd>
              <Editable value={TEACHER.credential} />
            </dd>
          </div>
          <div>
            <dt>02 / Experience</dt>
            <dd>
              <Editable value={TEACHER.experience} />
            </dd>
          </div>
        </dl>
      </section>
      <section className="section-x philosophy">
        <p className="kicker">
          <span />
          THE PHILOSOPHY
        </p>
        <h2>
          Understand the idea.
          <br />
          <em>Then make it your own.</em>
        </h2>
        <p lang="si" className="si">
          කටපාඩම් කිරීමෙන් ඔබ්බට ගොස්, විෂය තේරුම්ගෙන විශ්වාසයෙන් පිළිතුරු ලියමු.
        </p>
        <p>
          Our aim is simple: connect business concepts to everyday decisions, then turn that
          understanding into clear, structured answers.
        </p>
      </section>
      <section className="section-x about-method">
        <div className="section-heading">
          <p className="kicker">
            <span />
            THE LEARNING PROCESS
          </p>
          <h2>Four steps. One clear direction.</h2>
        </div>
        <div className="method-track">
          {METHOD.map((m, i) => (
            <article className="method-card" key={m.title}>
              <div className="method-top">0{i + 1}</div>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="inner-lms">
        <div className="section-x">
          <div>
            <p className="kicker kicker-light">
              <span />
              YOUR NEXT CHAPTER
            </p>
            <h2>
              Bring your curiosity.
              <br />
              Start learning.
            </h2>
            <p lang="si" className="si">
              ඔබේ ඉගෙනුම් ගමන මෙතැනින් අරඹන්න.
            </p>
          </div>
          <LmsButton size="lg">Enter LMS</LmsButton>
        </div>
      </section>
    </div>
  );
}
