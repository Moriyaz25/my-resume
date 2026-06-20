"use client";

import { motion } from "framer-motion";

const tones = ["clay-tint-kiln", "clay-tint-sage", "clay-tint-lavender"];

export default function Skills({ skills }) {
  const grouped = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});
  const groups = Object.entries(grouped);

  return (
    <section id="skills" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="section-eyebrow">What I work with</span>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            The toolkit, by job it does
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {groups.map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`clay ${tones[index % tones.length]} p-5 ${
                index === groups.length - 1 ? "sm:col-span-2" : "sm:col-span-1"
              } ${index < 3 ? "lg:col-span-4" : "lg:col-span-3"}`}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-ink/55">
                  {category}
                </h3>
                <span className="font-mono text-[10px] text-ink/35">
                  {String(items.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill.id} className="clay-tag">
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
