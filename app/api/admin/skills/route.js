const { NextResponse } = require("next/server");
const { prisma } = require("@/lib/prisma");
const { requireAdmin } = require("@/lib/requireAdmin");
const { skillSchema } = require("@/lib/validation");

async function GET() {
  const session = requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  return NextResponse.json({ skills });
}

async function POST(request) {
  const session = requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = skillSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const skill = await prisma.skill.create({ data: parsed.data });
    return NextResponse.json({ skill }, { status: 201 });
  } catch (err) {
    console.error("Create skill error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

module.exports = { GET, POST };
