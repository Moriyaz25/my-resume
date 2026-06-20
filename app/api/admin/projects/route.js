const { NextResponse } = require("next/server");
const { prisma } = require("@/lib/prisma");
const { requireAdmin } = require("@/lib/requireAdmin");
const { projectSchema } = require("@/lib/validation");

async function GET() {
  const session = requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ projects });
}

async function POST(request) {
  const session = requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const existing = await prisma.project.findUnique({ where: { slug: parsed.data.slug } });
    if (existing) {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 });
    }

    const project = await prisma.project.create({ data: parsed.data });
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    console.error("Create project error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

module.exports = { GET, POST };
