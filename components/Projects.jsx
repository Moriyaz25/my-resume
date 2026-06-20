"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

export default function Projects({ projects }) {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="section-eyebrow">Resume projects · 2024–2026</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink">
            Things I've actually shipped
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className={`clay p-6 flex flex-col ${
                project.featured || (!project.featured && i === projects.length - 1)
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {project.title}
                </h3>
                <div className="flex gap-2 shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className="clay-sm w-9 h-9 flex items-center justify-center hover:shadow-clay-hover transition-shadow"
                    >
                      <Github size={15} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live site`}
                      className="clay-sm w-9 h-9 flex items-center justify-center hover:shadow-clay-hover transition-shadow"
                    >
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>

              <p className="font-body text-sm text-ink/65 mb-4 leading-relaxed">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.techStack.slice(0, 5).map((tech) => (
                  <span key={tech} className="clay-tag text-[11px] py-1 px-2.5">
                    {tech}
                  </span>
                ))}
              </div>

              {project.metrics?.[0] && (
                <p className="font-mono text-xs text-sage font-medium mb-5">
                  <span aria-hidden="true">→</span> {project.metrics[0]}
                </p>
              )}

              <Link
                href={`/projects/${project.slug}`}
                className="mt-auto font-body text-sm font-semibold text-kiln hover:text-kiln-dark inline-flex items-center gap-1.5 transition-colors"
              >
                View case study <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
