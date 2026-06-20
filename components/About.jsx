"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Database } from "lucide-react";

const stats = [
  { label: "Resume projects", value: "7", tone: "clay-tint-kiln" },
  { label: "Experience programs", value: "2", tone: "clay-tint-sage" },
  { label: "Core technologies", value: "5+", tone: "clay-tint-lavender" },
];

export default function About() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">About</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-6">
            I build across the full product flow.
          </h2>
          <p className="font-body text-ink/70 leading-relaxed mb-4">
            I'm a final-year Computer Science student with hands-on experience
            building billing systems, AI-assisted dashboards, healthcare
            platforms, and responsive business websites.
          </p>
          <p className="font-body text-ink/70 leading-relaxed mb-8">
            My core stack is React, Next.js, and Node.js with PostgreSQL
            underneath. I enjoy connecting clean interfaces to practical APIs,
            secure data flows, and product experiences that remain easy to use.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`clay-sm ${stat.tone} p-4 text-center`}
              >
                <div className="font-display text-2xl font-semibold text-kiln">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] text-ink/60 mt-1 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-5"
        >
          <div className="clay clay-tint-kiln p-6 flex gap-4 items-start border-l-4 border-l-kiln/40">
            <div className="clay-sm w-12 h-12 flex items-center justify-center shrink-0 bg-kiln/10">
              <Code2 className="text-kiln" size={22} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">
                Frontend that feels right
              </h3>
              <p className="font-body text-sm text-ink/65 leading-relaxed">
                React and Next.js interfaces built around real component
                architecture, not one-off pages — reused across teams to cut
                delivery time.
              </p>
            </div>
          </div>

          <div className="clay clay-tint-sage p-6 flex gap-4 items-start border-l-4 border-l-sage/40">
            <div className="clay-sm w-12 h-12 flex items-center justify-center shrink-0 bg-sage/10">
              <Database className="text-sage" size={22} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">
                Backends that hold up
              </h3>
              <p className="font-body text-sm text-ink/65 leading-relaxed">
                PostgreSQL schemas and REST APIs designed for the load they'll
                actually see — transactions, indexing, and validation
                included.
              </p>
            </div>
          </div>

          <div className="clay clay-tint-lavender p-6 flex gap-4 items-start border-l-4 border-l-lavender">
            <div className="clay-sm w-12 h-12 flex items-center justify-center shrink-0 bg-lavender/10">
              <Rocket className="text-lavender" size={22} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold mb-1">
                Deployed, not just demoed
              </h3>
              <p className="font-body text-sm text-ink/65 leading-relaxed">
                I take projects from interface design through API integration
                and deployment using platforms such as Vercel, Netlify, and
                Render.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
