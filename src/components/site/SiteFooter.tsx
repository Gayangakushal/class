import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { LmsButton } from "./LmsButton";
import { CONTACT, TEACHER, CLASSES, WHATSAPP_URL } from "@/lib/site-data";
import { FooterSocialLinks } from "./SocialConnect";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-x">
        <div className="footer-word" aria-hidden="true">
          DESHAN<span>®</span>
        </div>
        <div className="footer-grid">
          <div>
            <p className="footer-brand">{TEACHER.name}</p>
            <p>{TEACHER.subject} · G.C.E. Advanced Level</p>
            <p>
              Clear concepts. Confident answers. Theory, revision and paper practice, in the
              classroom and online.
            </p>
            <p lang="si" className="si">
              {TEACHER.tagline}
            </p>
            <FooterSocialLinks />
            <LmsButton className="mt-6">
              LMS Login <ArrowUpRight size={18} />
            </LmsButton>
          </div>
          <nav aria-label="Footer">
            <h2>Explore</h2>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/classes">Classes & fees</Link>
            <Link to="/timetable">Timetable</Link>
            <Link to="/" hash="class-centres">
              Class Centres
            </Link>
            <Link to="/" hash="results">
              Student Results
            </Link>
            <Link to="/" hash="contact">
              Contact
            </Link>
          </nav>
          <nav aria-label="Class links">
            <h2>Programmes</h2>
            {CLASSES.map((c) => (
              <Link key={c.id} to="/classes" hash={c.id}>
                {c.title}
              </Link>
            ))}
          </nav>
          <div>
            <h2>Get in touch</h2>
            <a className="footer-contact-item" href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" /><span><small>Phone</small>{CONTACT.phone}</span></a>
            <a className="footer-contact-item" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" /><span><small>WhatsApp</small>{CONTACT.whatsapp}</span></a>
            <a className="footer-contact-item" href={`mailto:${CONTACT.email}`}><Mail aria-hidden="true" /><span><small>Email</small>{CONTACT.email}</span></a>
            <p className="footer-contact-item"><MapPin aria-hidden="true" /><span><small>Location</small>{CONTACT.address}</span></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {TEACHER.name}. All rights reserved.
          </p>
          <p>Details in [ ] await confirmation.</p>
        </div>
        <p className="developer-credit">
          Designed &amp; Developed by <span>Novonex Software Solutions</span>
        </p>
      </div>
    </footer>
  );
}
