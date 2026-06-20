"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import ClayTerminalIllustration from "./ClayTerminalIllustration";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6">
      {/* Ambient floating clay blobs */}
      <div
        aria-hidden
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-sage/20 blur-2xl animate-float-slow"
      />
      <div
        aria-hidden
        className="absolute top-40 right-0 w-56 h-56 rounded-full bg-kiln/15 blur-3xl animate-float-slower"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="section-eyebrow">Full Stack Web Developer</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.08] mb-6">
            I build software
            <br />
            that <span className="text-kiln italic">ships</span>, not
            <br />
            just demos.
          </h1>
          <p className="font-body text-lg text-ink/70 max-w-md mb-8 leading-relaxed">
            React, Next.js, and Node.js developer with seven hands-on projects
            spanning AI-powered dashboards, full-stack business systems, and
            responsive web experiences.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <a href="#projects" className="clay-button">
              See my work
            </a>
            <a href="#contact" className="clay-button-outline">
              Get in touch
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Moriyaz25"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="clay-sm w-11 h-11 flex items-center justify-center hover:shadow-clay-hover transition-shadow"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/mohd-riyaz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="clay-sm w-11 h-11 flex items-center justify-center hover:shadow-clay-hover transition-shadow"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:moriyaz933@gmail.com"
              aria-label="Email"
              className="clay-sm w-11 h-11 flex items-center justify-center hover:shadow-clay-hover transition-shadow"
            >
              <Mail size={18} />
            </a>
          </div>
        </motion.div>

        {/* Right: signature claymorphic illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <ClayTerminalIllustration />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 clay-sm w-10 h-10 items-center justify-center"
      >
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}
