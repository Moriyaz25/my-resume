// Seed script — populates the database with Riyaz's real project/experience/skill data
// Run with: npm run db:seed

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ---- Admin user ----
  const adminEmail = process.env.ADMIN_EMAIL || "moriyaz933@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });
  console.log(`Admin user ready: ${adminEmail}`);

  // ---- Projects ----
  const projects = [
    {
      slug: "retailflow",
      title: "RetailFlow",
      summary: "Billing & inventory management system for retail workflows",
      description:
        "A full-stack billing and inventory platform that helps retail businesses manage products, sales, stock, and invoices from one place. The system combines operational workflows with analytics dashboards for visibility into sales trends and inventory health.",
      techStack: ["Next.js", "Node.js", "PostgreSQL", "REST API", "Vercel"],
      metrics: [
        "Real-time inventory tracking and low-stock monitoring",
        "Invoice generation and structured sales record management",
        "Analytics dashboards for sales, inventory, and business performance",
      ],
      githubUrl: "https://github.com/Moriyaz25",
      liveUrl: "",
      imageUrl: "",
      featured: true,
      order: 1,
    },
    {
      slug: "vizassistance",
      title: "VizAssistance",
      summary: "AI-powered data visualization platform for non-technical users",
      description:
        "An AI-powered data visualization platform that converts raw CSV and Excel datasets into interactive dashboards. It combines automated chart generation, AI-written insights, secure authentication, and user-specific dataset history in a modular SaaS-style interface.",
      techStack: ["React.js", "Supabase", "Gemini AI", "Recharts", "Tailwind CSS"],
      metrics: [
        "Automated chart generation from uploaded CSV and Excel datasets",
        "AI-generated summaries, trends, and dataset insights",
        "Secure Supabase authentication, storage, and user-specific history",
      ],
      githubUrl: "https://github.com/Moriyaz25",
      liveUrl: "https://viz-assistant.vercel.app",
      imageUrl: "",
      featured: true,
      order: 2,
    },
    {
      slug: "mtboss-construction",
      title: "MTBOSS Construction Website",
      summary: "Service & inquiry management system with admin dashboard",
      description:
        "A modern construction company website presenting infrastructure services, featured projects, achievements, and client feedback. It includes dynamic service and inquiry management workflows supported by a dedicated admin dashboard.",
      techStack: ["Next.js", "Node.js", "PostgreSQL"],
      metrics: [
        "Dynamic services and featured-project presentation",
        "Admin dashboard for inquiry management",
        "Responsive, performance-focused interface",
      ],
      githubUrl: "https://github.com/Moriyaz25",
      liveUrl: "",
      imageUrl: "",
      featured: false,
      order: 3,
    },
    {
      slug: "muft-madad",
      title: "Muft Madad",
      summary: "Healthcare support platform with real-time admin notifications",
      description:
        "A full-stack healthcare platform designed for patient support and treatment assistance, with a responsive interface, backend APIs, secure PostgreSQL integration, and clear navigation across the user journey.",
      techStack: ["Next.js", "Express.js", "Node.js", "PostgreSQL"],
      metrics: [
        "Responsive patient-support interface",
        "Backend APIs built with Express.js and Node.js",
        "Secure PostgreSQL data integration",
      ],
      githubUrl: "https://github.com/Moriyaz25",
      liveUrl: "",
      imageUrl: "",
      featured: false,
      order: 4,
    },
    {
      slug: "protein-hub",
      title: "The Protein Hub",
      summary: "High-conversion single page promotional app",
      description:
        "A modern single-page promotional experience for a health-focused restaurant brand, featuring dynamic category filtering, custom JavaScript animations, and a conversion-focused responsive layout.",
      techStack: ["React.js", "Vite", "Tailwind CSS"],
      metrics: [
        "Dynamic food-category filtering",
        "Custom JavaScript interactions and animations",
        "Responsive layout across mobile and desktop devices",
      ],
      githubUrl: "https://github.com/Moriyaz25",
      liveUrl: "",
      imageUrl: "",
      featured: false,
      order: 5,
    },
    {
      slug: "eduflex",
      title: "EduFlex",
      summary: "Responsive frontend for an online learning platform",
      description:
        "A frontend e-learning platform designed around discoverable course listings, focused learning dashboards, and intuitive navigation. The responsive interface keeps the learning experience clear across desktop and mobile devices.",
      techStack: ["React.js", "JavaScript", "CSS3", "Responsive Design"],
      metrics: [
        "Course discovery and listing experience",
        "Learner-focused dashboard layouts",
        "Clean navigation optimized for usability across devices",
      ],
      githubUrl: "https://github.com/Moriyaz25",
      liveUrl: "",
      imageUrl: "",
      featured: false,
      order: 6,
    },
    {
      slug: "personal-portfolio",
      title: "Personal Portfolio Website",
      summary: "Responsive portfolio with interactive UI components",
      description:
        "A responsive personal portfolio built to present projects, skills, and professional information through interactive UI components and a lightweight, performance-conscious frontend.",
      techStack: ["HTML5", "CSS3", "JavaScript"],
      metrics: [
        "Interactive project and profile presentation",
        "Responsive layouts for different screen sizes",
        "Frontend optimized for fast page loading",
      ],
      githubUrl: "https://github.com/Moriyaz25",
      liveUrl: "",
      imageUrl: "",
      featured: false,
      order: 7,
    },
  ];

  await prisma.project.deleteMany({
    where: { slug: { notIn: projects.map((project) => project.slug) } },
  });

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log(`Seeded ${projects.length} projects`);

  // ---- Experience ----
  const experiences = [
    {
      company: "Zentrix Infotech",
      role: "Digital Marketing & Web Development Intern",
      duration: "2025 · 4 months",
      type: "internship",
      bullets: [
        "Contributed across web development and digital marketing during a four-month internship, collaborating with the team on responsive web pages and user-experience improvements.",
        "Created and edited promotional videos for hospitals, doctors, and healthcare campaigns using CapCut and mobile editing workflows.",
        "Produced short-form content optimized for Instagram and Facebook, supporting campaign reach and audience engagement.",
        "Reviewed marketing performance data and suggested practical improvements for content and digital campaigns.",
        "Supported website-page optimization alongside social media content strategy, bridging technical delivery with marketing goals.",
      ],
      order: 1,
    },
    {
      company: "Electronic Arts (Forage)",
      role: "Software Engineering Virtual Experience",
      duration: "Virtual Internship",
      type: "virtual",
      bullets: [
        "Completed a software engineering simulation focused on system design and feature development.",
        "Practiced structured debugging, technical documentation, and day-to-day engineering workflows.",
        "Designed solutions aimed at improving development pipelines and overall software reliability.",
      ],
      order: 2,
    },
  ];

  await prisma.experience.deleteMany();
  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`Seeded ${experiences.length} experience entries`);

  // ---- Skills ----
  const skills = [
    { name: "React.js", category: "Frontend", order: 1 },
    { name: "Next.js", category: "Frontend", order: 2 },
    { name: "JavaScript (ES6+)", category: "Frontend", order: 3 },
    { name: "TypeScript (learning)", category: "Frontend", order: 4 },
    { name: "HTML5", category: "Frontend", order: 5 },
    { name: "CSS3", category: "Frontend", order: 6 },
    { name: "Node.js", category: "Backend", order: 1 },
    { name: "Express.js", category: "Backend", order: 2 },
    { name: "REST API Design", category: "Backend", order: 3 },
    { name: "PostgreSQL", category: "Database", order: 1 },
    { name: "MySQL", category: "Database", order: 2 },
    { name: "Supabase", category: "Database", order: 3 },
    { name: "Firebase", category: "Database", order: 4 },
    { name: "Tailwind CSS", category: "UI & Styling", order: 1 },
    { name: "Framer Motion", category: "UI & Styling", order: 2 },
    { name: "Responsive Design", category: "UI & Styling", order: 3 },
    { name: "Git & GitHub", category: "Dev Tools", order: 1 },
    { name: "Postman", category: "Dev Tools", order: 2 },
    { name: "VS Code", category: "Dev Tools", order: 3 },
    { name: "Vite", category: "Dev Tools", order: 4 },
    { name: "Vercel", category: "Deployment", order: 1 },
    { name: "Netlify", category: "Deployment", order: 2 },
    { name: "Render", category: "Deployment", order: 3 },
    { name: "Gemini AI", category: "AI & APIs", order: 1 },
    { name: "Claude AI", category: "AI & APIs", order: 2 },
    { name: "Cursor IDE", category: "AI & APIs", order: 3 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`Seeded ${skills.length} skills`);

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
