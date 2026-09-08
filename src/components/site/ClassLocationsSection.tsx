import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { CLASS_LOCATIONS, type ClassLocation } from "@/lib/site-data";
import { Reveal } from "./HomeShowcase";

function LocationArtwork({ location }: { location: ClassLocation }) {
  if (location.image) {
    return (
      <div className="location-art location-art-photo">
        <img
          src={location.image}
          alt={`${location.city} class centre`}
          loading="lazy"
          decoding="async"
        />
        <span aria-hidden="true">BS / BUSINESS STUDIES · {location.number}</span>
      </div>
    );
  }

  return (
    <div className={`location-art location-art-${location.accent}`} aria-hidden="true">
      <div className="location-art-grid" />
      <span className="location-art-orbit" />
      <span className="location-art-disc" />
      <span className="location-art-line" />
      <div className="location-art-copy">
        <small>BS / BUSINESS STUDIES</small>
        <strong>{location.number}</strong>
        <span>THEORY · REVISION · 2027 A/L</span>
      </div>
    </div>
  );
}

function LocationDetails({ location }: { location: ClassLocation }) {
  return (
    <div className="location-card-copy">
      <div className="location-card-heading">
        <div>
          <span className="location-sample">Sample branch · easy to update</span>
          <h3>{location.city}</h3>
        </div>
        <MapPin aria-hidden="true" />
      </div>
      <p className="location-venue">{location.venue}</p>
      <p className="location-description">{location.description}</p>
      <div className="location-meta">
        <span>
          <Clock3 aria-hidden="true" />
          {location.schedule}
        </span>
        <span>
          <Phone aria-hidden="true" />
          {location.contact}
        </span>
      </div>
      <a
        className="location-cta"
        href="#contact"
        aria-label={`View sample class details for ${location.city}`}
      >
        View Details <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}

function LocationCard({ location }: { location: ClassLocation }) {
  return (
    <article className={`location-card${location.featured ? " location-card-featured" : ""}`}>
      <LocationArtwork location={location} />
      <LocationDetails location={location} />
    </article>
  );
}

export function ClassLocationsSection() {
  const featuredLocation =
    CLASS_LOCATIONS.find((location) => location.featured) ?? CLASS_LOCATIONS[0];
  const otherLocations = CLASS_LOCATIONS.filter((location) => location.id !== featuredLocation.id);

  return (
    <section id="class-centres" className="locations-section" aria-labelledby="locations-heading">
      <div className="locations-backdrop" aria-hidden="true" />
      <div className="section-x locations-inner">
        <div className="locations-header">
          <div>
            <p className="kicker kicker-light">
              <span />
              OUR CLASS LOCATIONS
            </p>
            <h2 id="locations-heading">
              Find a class
              <br />
              near you.
            </h2>
          </div>
          <div className="locations-intro">
            <p className="si" lang="si">
              ඔබට පහසුම branch එකෙන් BS Business Studies class එකට සම්බන්ධ වෙන්න.
            </p>
            <p>
              Preview locations for layout purposes. Confirmed class centre details can be updated
              here later.
            </p>
          </div>
        </div>

        <div className="locations-layout">
          <Reveal>
            <LocationCard location={featuredLocation} />
          </Reveal>
          <div className="locations-small-grid">
            {otherLocations.map((location) => (
              <Reveal key={location.id}>
                <LocationCard location={location} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
