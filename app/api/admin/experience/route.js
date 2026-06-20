const { NextResponse } = require("next/server");
const { prisma } = require("@/lib/prisma");
const { requireAdmin } = require("@/lib/requireAdmin");
const { experienceSchema } = require("@/lib/validation");

async function GET() {
  const session = requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const experience = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ experience });
}

async function POST(request) {
  const session = requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = experienceSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const experience = await prisma.experience.create({ data: parsed.data });
    return NextResponse.json({ experience }, { status: 201 });
  } catch (err) {
    console.error("Create experience error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

module.exports = { GET, POST };
