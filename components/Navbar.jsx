"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="clay flex items-center justify-between px-5 py-3 sm:px-6">
          <a href="#top" className="font-display text-xl font-semibold text-ink">
            Riyaz<span className="text-kiln">.</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-clay-sm font-body text-sm font-medium text-ink/80 hover:text-ink hover:bg-clay-shadow/60 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex clay-button text-sm py-2.5 px-5"
          >
            Let's talk
          </a>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-clay-sm shadow-clay-out-sm"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="clay mt-3 p-4 flex flex-col gap-1 md:hidden">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-clay-sm font-body text-sm font-medium text-ink/80 hover:bg-clay-shadow/60"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="clay-button text-sm text-center mt-2"
            >
              Let's talk
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
