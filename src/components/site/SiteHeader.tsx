import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ArrowUpRight } from "lucide-react";
import { LmsButton } from "./LmsButton";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { TEACHER } from "@/lib/site-data";
const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/classes", label: "Classes" },
  { to: "/timetable", label: "Timetable" },
] as const;
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const location = useRouterState({ select: (s) => s.location.href });
  useEffect(() => {
    const update = () => {
      const hero = document.querySelector(".hero-stage, .page-hero");
      setLight(!!hero && hero.getBoundingClientRect().bottom <= 80);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [location]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  return (
    <header className={`site-header ${light ? "header-light" : ""}`}>
      <div className="section-x header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">DP</span>
          <span>
            <strong>{TEACHER.name}</strong>
            <small>BUSINESS STUDIES · A/L</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "nav-active", "aria-current": "page" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <LmsButton size="sm" className="header-lms">
          LMS Login <ArrowUpRight size={16} />
        </LmsButton>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="menu-toggle" aria-label="Open menu">
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent className="mobile-menu" side="right">
            <SheetTitle className="text-white">DESHAN / BS</SheetTitle>
            <SheetDescription className="text-white/70">
              Your next chapter starts here.
            </SheetDescription>
            <nav aria-label="Mobile">
              {NAV.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "nav-active", "aria-current": "page" }}
                >
                  <small>0{i + 1}</small>
                  {item.label}
                </Link>
              ))}
            </nav>
            <LmsButton size="lg">
              LMS Login <ArrowUpRight size={18} />
            </LmsButton>
            <Link to="/classes" className="menu-class-cta" onClick={() => setOpen(false)}>
              Find your class <ArrowUpRight size={18} />
            </Link>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
