"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrorMsg("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-4 py-20 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="section-eyebrow">Get in touch</span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-3">
            Have a project in mind?
          </h2>
          <p className="font-body text-ink/65">
            Tell me what you're building — I read every message myself.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="clay p-6 sm:p-8"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center text-center py-8">
              <div className="clay-sm w-14 h-14 flex items-center justify-center mb-4 bg-sage/10">
                <CheckCircle2 className="text-sage" size={26} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Message sent</h3>
              <p className="font-body text-sm text-ink/65">
                Thanks for reaching out — I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="clay-button-outline mt-6 text-sm"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="font-body text-sm font-medium text-ink/80 mb-2 block">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="clay-input"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-body text-sm font-medium text-ink/80 mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="clay-input"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="font-body text-sm font-medium text-ink/80 mb-2 block">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  minLength={10}
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="clay-input resize-none"
                  placeholder="What are you working on?"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-kiln-dark font-body text-sm">
                  <AlertCircle size={16} />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="clay-button w-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </motion.div>

        <div className="flex items-center justify-center gap-2 mt-6 font-body text-sm text-ink/50">
          <Mail size={14} /> moriyaz933@gmail.com
        </div>
      </div>
    </section>
  );
}
