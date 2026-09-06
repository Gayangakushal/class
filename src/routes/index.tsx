import { TypewriterHero } from "@/components/site/TypewriterHero";
import { ClassCentres, StudentResults, Reveal } from "@/components/site/HomeShowcase";
import { SampleImage } from "@/components/site/SampleImage";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, BookOpen, Check, ChevronRight, Clock3, FileCheck2, GraduationCap, Laptop2, MapPin, MessageCircle, Play, Quote, Target, Trophy } from "lucide-react";
import { TEACHER_PORTRAIT } from "@/lib/site-data";
import { LmsButton } from "@/components/site/LmsButton";
import { CLASSES, FAQS, LMS_URL, TEACHER, TIMETABLE } from "@/lib/site-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Deshan Pathinayake | A/L Business Studies" },
    { name: "description", content: "Theory, revision and paper classes for Sri Lankan A/L Business Studies students — online and physical." },
    { property: "og:title", content: "Deshan Pathinayake | A/L Business Studies" },
  ]}), component: Home,
});

const STEPS = [
  { n: "01", icon: BookOpen, title: "Concept Clarity", si: "මුලින්ම විෂය තේරුම් ගනිමු", body: "Complex business concepts explained through simple, memorable real-world examples." },
  { n: "02", icon: FileCheck2, title: "Structured Notes", si: "ලකුණු ගන්න පිළිතුරු රටාව", body: "Focused notes and answer frameworks built around the marking scheme." },
  { n: "03", icon: Target, title: "Exam Practice", si: "නිතර ලියමු. නිවැරදි කරමු.", body: "Timed writing, model answers and targeted past-paper discussion every week." },
  { n: "04", icon: Trophy, title: "Progress Review", si: "ඔබේ ගමන මැන බලමු", body: "Consistent feedback that shows exactly where the next marks will come from." },
];

function SectionTitle({ tag, title, sinhala, light = false }: { tag: string; title: string; sinhala?: string; light?: boolean }) {
  return <div className="section-heading"><p className={light ? "kicker kicker-light" : "kicker"}><span />{tag}</p><h2 className={light ? "text-white" : ""}>{title}</h2>{sinhala && <p className={light ? "si mt-3 text-white/65" : "si mt-3 text-muted-foreground"}>{sinhala}</p>}</div>;
}

function Home() {
  return <>
    <section className="hero-stage">
      <div className="hero-grid" aria-hidden><span /><span /><span /><span /><span /><span /></div>
      <div className="section-x hero-inner">
        <div className="hero-copy">
          <div className="hero-heading-block"><p className="hero-si si">ව්‍යාපාර ලෝකය තේරුම් ගන්න.</p>
          <TypewriterHero /></div>
          <p className="hero-lead si">Theory එක මතක තබාගැනීමෙන් එහාට — concepts තේරුම්ගෙන, examiner බලාපොරොත්තු වන විදිහට confident answer එකක් ලියන්න ඉගෙනගන්න.</p>
          <div className="hero-actions"><Link to="/classes" className="button-electric">Explore Classes <ArrowRight className="size-4" /></Link><LmsButton size="lg" className="button-ghost-light">Student LMS <ArrowDownRight className="size-4" /></LmsButton></div>
          <div className="hero-proof"><div className="proof-faces"><span>BS</span><span>A+</span><span>DP</span></div><p><strong>Theory · Revision · Paper</strong><br/>Online & physical learning</p></div>
        </div>
        <div className="hero-visual">
          <div className="hero-monogram" aria-hidden="true">BS</div>
          <div className="hero-orbit orbit-one" aria-hidden="true"/><div className="hero-orbit orbit-two" aria-hidden="true"/>
          <div className="teacher-lime-backdrop" aria-hidden="true" />
          <img className="hero-teacher-image" src={TEACHER_PORTRAIT} alt={`${TEACHER.name}, A/L Business Studies teacher`} width={1024} height={1536} fetchPriority="high" />
          <div className="floating-note note-top"><span>01</span><p>Understand<br/><b>the concept</b></p></div><div className="floating-note note-bottom"><span>02</span><p>Write for<br/><b>the marks</b></p></div>
        </div>
      </div>
      <div className="hero-ticker">
        <div className="ticker-track">
          {[false, true].map((duplicate) => (
            <div className="ticker-group" key={String(duplicate)} aria-hidden={duplicate ? true : undefined}>
              <span>THEORY</span><i aria-hidden="true" />
              <span>REVISION</span><i aria-hidden="true" />
              <span>PAPER CLASS</span><i aria-hidden="true" />
              <span>ONLINE LMS</span><i aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="manifesto section-x"><div className="manifesto-mark">“</div><div><p className="kicker"><span/>THE DIFFERENCE</p><h2 className="si">Business Studies කියන්නේ<br/><em>කටපාඩම් කරන විෂයක් නෙවෙයි.</em></h2></div><p>It is a way of seeing how decisions, people and markets work. Once that thinking becomes clear, the answer—and the marks—follow.</p></section>

    <section className="course-zone"><div className="section-x py-20 md:py-28"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionTitle tag="Choose your route" title="One goal. Three ways to get there." sinhala="ඔබේ exam stage එකට හරියන class එකෙන් පටන්ගන්න." light /><Link to="/classes" className="text-link-light">View all class details <ArrowRight className="size-4"/></Link></div>
      <div className="course-stack">{CLASSES.map((course, index) => <Reveal key={course.id}><article className={`course-ticket ticket-${index + 1}`}><div className="ticket-number">0{index + 1}</div><div className="ticket-main"><SampleImage src={course.image} alt={`Replaceable sample artwork for ${course.title}`} /><div className="flex flex-wrap items-center gap-2"><span className="ticket-year">{course.year}</span>{course.featured && <span className="popular">Most popular</span>}</div><h3>{course.title}</h3><p className="si">{course.si}</p><p className="ticket-blurb">{course.blurb}</p><ul>{course.points.map(point => <li key={point}><Check className="size-4"/>{point}</li>)}</ul></div><div className="ticket-action"><Link to="/classes" hash={course.id} aria-label={`View ${course.title}`}><ArrowDownRight/></Link></div></article></Reveal>)}</div>
    </div></section>

    <section className="method-zone section-x"><SectionTitle tag="The learning system" title="Clarity turns into confidence." sinhala="හොඳ result එකක් එන්නේ ක්‍රමවත් process එකකින්." /><div className="method-track">{STEPS.map((step) => { const Icon = step.icon; return <article key={step.n} className="method-card"><div className="method-top"><span>{step.n}</span><Icon/></div><h3>{step.title}</h3><p className="si">{step.si}</p><p>{step.body}</p></article>})}</div></section>

    <section className="teacher-story"><div className="section-x story-grid"><div className="story-portrait"><div className="story-word" aria-hidden>DESHAN</div><img src={TEACHER_PORTRAIT} alt={`${TEACHER.name}, A/L Business Studies teacher`} width={1024} height={1536} loading="lazy" decoding="async"/><div className="story-badge"><GraduationCap/><span>A/L<br/><b>BUSINESS</b></span></div></div><div className="story-copy"><p className="kicker kicker-light"><span/>MEET YOUR TEACHER</p><h2>Not just a lesson.<br/><em>A sharper way to think.</em></h2><p className="si">විෂය කරුණු සරලව පැහැදිලි කරමින්, නිවැරදිව ප්‍රශ්නය කියවා examinerගේ expectation එකට ගැළපෙන answer එකක් ගොඩනගන්න ඔබට මඟ පෙන්වීම අපේ අරමුණයි.</p><div className="story-values"><span><Check/>Clear explanations</span><span><Check/>Exam-focused writing</span><span><Check/>Consistent guidance</span></div><Link to="/about" className="button-electric">Discover the approach <ArrowRight className="size-4"/></Link></div></div></section>

    <section className="schedule-zone section-x"><div className="schedule-head"><SectionTitle tag="Weekly rhythm" title="Find your class." sinhala="Online හෝ physical — ඔබට ගැළපෙන වේලාව තෝරගන්න."/><Link to="/timetable" className="round-link">Full timetable <ArrowRight/></Link></div><div className="schedule-grid">{TIMETABLE.map((venue, index) => <article className="venue-card" key={venue.venue}><header><div><span className="venue-index">0{index + 1}</span><h3>{venue.venue}</h3><p><MapPin/> {venue.location}</p></div><span className="mode-chip">{venue.mode}</span></header>{venue.rows.map((row, i) => <div className="schedule-row" key={i}><div><strong>{row.batch}</strong><span>{row.day}</span></div><p><Clock3/>{row.time}</p><ChevronRight/></div>)}</article>)}</div></section>

    <ClassCentres />
    <section className="lms-stage"><div className="lms-noise" aria-hidden/><div className="section-x lms-grid"><div><p className="kicker kicker-light"><span/>YOUR DIGITAL CLASSROOM</p><h2>Class ends.<br/><span>Learning doesn’t.</span></h2><p className="si">Recorded lessons, notes, papers සහ revision materials — එකම place එකකින්, ඕනෑම වෙලාවක.</p><a href={LMS_URL} className="button-electric">Login to Student LMS <ArrowRight className="size-4"/></a></div><div className="lms-console"><SampleImage src="/images/classes/online-class.svg" alt="Replaceable online learning illustration" /><div className="console-top"><span/><span/><span/><small>SAMPLE LMS PREVIEW</small></div><div className="console-body"><div className="console-welcome"><span>Welcome back</span><b>Ready for your next lesson?</b></div><div className="console-progress"><div><Play/><p><small>CONTINUE WATCHING</small><b>Unit 08 · Marketing</b></p><span>72%</span></div><i><span/></i></div><div className="console-tiles"><div><Laptop2/><b>Recorded Lessons</b><small>Learn on your time</small></div><div><FileCheck2/><b>Paper Library</b><small>Practice with purpose</small></div></div></div></div></div></section>

    <StudentResults />
    <section className="faq-zone section-x"><div className="faq-intro"><SectionTitle tag="Need to know" title="Questions, answered." sinhala="තවමත් ප්‍රශ්නයක් තියෙනවද? අපිට message එකක් දාන්න."/><a href="#contact" className="faq-chat"><MessageCircle/> Chat with us</a></div><Accordion type="single" collapsible className="faq-list">{FAQS.map((faq, index) => <AccordionItem value={`faq-${index}`} key={faq.q}><AccordionTrigger><span>0{index + 1}</span><b className="si">{faq.q}</b></AccordionTrigger><AccordionContent className="si">{faq.a}</AccordionContent></AccordionItem>)}</Accordion></section>
    <section className="final-cta" id="contact"><div className="section-x"><Quote className="cta-quote"/><p className="si">ඔබේ result එක වෙනස් කරන<br/>decision එක අද ගන්න.</p><h2>Start before you feel ready.</h2><div><Link to="/classes" className="button-electric">Join a class <ArrowRight className="size-4"/></Link><a href={LMS_URL} className="text-link-light">Already a student? Login</a></div></div></section>
  </>;
}