import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 0; // always fetch fresh data so admin edits show immediately

export default async function HomePage() {
  let projects = [];
  let experience = [];
  let skills = [];

  try {
    [projects, experience, skills] = await Promise.all([
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
    ]);
  } catch (err) {
    // If the database isn't connected yet (e.g. first run before `db:push` + `db:seed`),
    // render the page with empty sections instead of crashing.
    console.error("Database fetch failed — did you run `npm run db:push` and `npm run db:seed`?", err);
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
