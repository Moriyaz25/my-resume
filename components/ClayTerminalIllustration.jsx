"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  Code2,
  Database,
  Server,
  Sparkles,
} from "lucide-react";

const codeLines = [
  { width: "82%", tone: "bg-kiln" },
  { width: "58%", tone: "bg-sage" },
  { width: "72%", tone: "bg-lavender" },
  { width: "46%", tone: "bg-clay-light/35" },
];

export default function ClayTerminalIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[31rem] py-5">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="clay clay-tint-kiln relative overflow-hidden p-5 sm:p-6"
      >
        <div
          aria-hidden
          className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-kiln/20 blur-2xl"
        />

        <div className="relative mb-5 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
              Developer workspace
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-ink">
              Build status
            </h2>
          </div>
          <span className="clay-sm clay-tint-sage inline-flex items-center gap-2 px-3 py-2 font-mono text-[10px] font-semibold text-sage">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sage" />
            Live
          </span>
        </div>

        <div className="relative grid grid-cols-[1.35fr_0.75fr] gap-3">
          <div className="rounded-[1.5rem] bg-ink p-4 shadow-[inset_5px_5px_12px_rgba(0,0,0,0.4),5px_7px_14px_rgba(71,44,29,0.2)] sm:p-5">
            <div className="mb-5 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-kiln" />
              <span className="h-2.5 w-2.5 rounded-full bg-sage" />
              <span className="h-2.5 w-2.5 rounded-full bg-lavender" />
              <span className="ml-auto font-mono text-[8px] text-clay-light/35">
                portfolio.js
              </span>
            </div>

            <div className="space-y-3">
              {codeLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.12 }}
                  style={{ width: line.width, transformOrigin: "left" }}
                  className={`h-2 rounded-full ${line.tone} opacity-80`}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2">
              <CheckCircle2 size={13} className="text-sage" />
              <span className="font-mono text-[9px] text-clay-light/60">
                Production build passed
              </span>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="clay-sm clay-tint-sage flex flex-col justify-between p-3 sm:p-4">
              <Database size={18} className="text-sage" />
              <div>
                <strong className="block font-display text-lg text-ink">7</strong>
                <span className="font-mono text-[8px] uppercase tracking-wider text-ink/45">
                  Projects
                </span>
              </div>
            </div>
            <div className="clay-sm clay-tint-lavender flex flex-col justify-between p-3 sm:p-4">
              <BarChart3 size={18} className="text-[#9c74b0]" />
              <div>
                <strong className="block font-display text-lg text-ink">Full</strong>
                <span className="font-mono text-[8px] uppercase tracking-wider text-ink/45">
                  Stack
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-3 grid grid-cols-3 gap-3">
          {[
            [Code2, "React"],
            [Server, "Node.js"],
            [Sparkles, "AI APIs"],
          ].map(([Icon, label]) => (
            <div
              key={label}
              className="clay-sm flex items-center justify-center gap-2 px-2 py-3 font-mono text-[9px] font-semibold text-ink/60 sm:text-[10px]"
            >
              <Icon size={13} className="text-kiln" />
              {label}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        animate={{ rotate: [0, 8, 0], y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute -right-2 top-0 h-10 w-10 rounded-full bg-kiln shadow-[5px_7px_14px_rgba(201,78,41,0.35)]"
      />
    </div>
  );
}
