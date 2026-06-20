import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-4 sm:px-6">
      <div className="max-w-6xl mx-auto clay-sm px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-sm text-ink/60">
          © {new Date().getFullYear()} Mohd Riyaz. Built with Next.js & PostgreSQL.
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Moriyaz25"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-ink/50 hover:text-kiln transition-colors"
          >
            <Github size={17} />
          </a>
          <a
            href="https://linkedin.com/in/mohd-riyaz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-ink/50 hover:text-kiln transition-colors"
          >
            <Linkedin size={17} />
          </a>
          <a
            href="mailto:moriyaz933@gmail.com"
            aria-label="Email"
            className="text-ink/50 hover:text-kiln transition-colors"
          >
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
