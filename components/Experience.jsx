"use client";

import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  Sparkles,
} from "lucide-react";

const typeLabels = {
  internship: "Internship",
  virtual: "Virtual experience",
};

export default function Experience({ experience }) {
  return (
    <section id="experience" className="relative overflow-hidden px-4 py-20 sm:px-6">
      <div
        aria-hidden
        className="absolute -right-28 top-20 h-72 w-72 rounded-full bg-sage/15 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-24 bottom-24 h-64 w-64 rounded-full bg-kiln/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 grid gap-6 md:grid-cols-[1fr_0.9fr] md:items-end"
        >
          <div>
            <span className="section-eyebrow">Professional journey</span>
            <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Building products. Understanding people.
            </h2>
          </div>

          <div className="clay clay-sage flex gap-3 p-5 text-clay-light">
            <Sparkles className="mt-0.5 shrink-0 text-[#f8d5c5]" size={18} />
            <p className="font-body text-sm leading-relaxed text-clay-light/90">
              I work where products meet people—building responsive web
              experiences, shaping digital campaigns, and strengthening
              software through practical engineering.
            </p>
          </div>
        </motion.div>

        <div className="relative space-y-8 before:absolute before:bottom-8 before:left-[23px] before:top-8 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-kiln before:via-sage before:to-lavender sm:before:left-[31px]">
          {experience.map((exp, index) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative pl-16 sm:pl-20"
            >
              <div className="clay-sm clay-tint-kiln absolute left-0 top-6 z-10 flex h-12 w-12 items-center justify-center sm:h-16 sm:w-16">
                <BriefcaseBusiness className="text-kiln" size={21} />
              </div>

              <div className="clay overflow-hidden border-l-4 border-l-kiln/30">
                <div className="border-b border-ink/10 bg-gradient-to-r from-kiln/10 via-kiln/[0.04] to-sage/10 p-5 sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="mb-3 inline-flex rounded-full bg-sage/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-sage">
                        {typeLabels[exp.type] || exp.type}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                        {exp.role}
                      </h3>
                      <p className="mt-2 flex items-center gap-2 font-body text-sm font-medium text-ink/65">
                        <Building2 size={15} className="text-kiln" />
                        {exp.company}
                      </p>
                    </div>
                    <span className="clay-sm clay-tint-sage inline-flex w-fit items-center gap-2 px-3 py-2 font-mono text-xs text-ink/60">
                      <CalendarDays size={14} />
                      {exp.duration}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 p-5 sm:p-7">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="flex gap-3 font-body text-sm leading-relaxed text-ink/70"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
