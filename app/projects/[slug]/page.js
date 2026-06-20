import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Mohd Riyaz`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });

  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-body text-sm text-ink/60 hover:text-kiln mb-8 transition-colors"
          >
            <ArrowLeft size={15} /> Back to projects
          </Link>

          <div className="clay p-8 sm:p-10">
            <span className="section-eyebrow">Case study</span>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-4">
              {project.title}
            </h1>
            <p className="font-body text-lg text-ink/65 mb-6 leading-relaxed">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech) => (
                <span key={tech} className="clay-tag">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-button-outline text-sm inline-flex items-center gap-2"
                >
                  <Github size={15} /> View code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-button text-sm inline-flex items-center gap-2"
                >
                  Visit live site <ArrowUpRight size={15} />
                </a>
              )}
            </div>

            <div className="border-t border-ink/10 pt-8">
              <h2 className="font-display text-xl font-semibold mb-3">Overview</h2>
              <p className="font-body text-ink/70 leading-relaxed mb-8">
                {project.description}
              </p>

              <h2 className="font-display text-xl font-semibold mb-4">Key highlights</h2>
              <ul className="space-y-3">
                {project.metrics.map((metric, idx) => (
                  <li key={idx} className="clay-sm p-4 font-body text-sm text-ink/75">
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
