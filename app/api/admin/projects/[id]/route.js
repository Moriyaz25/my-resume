const { NextResponse } = require("next/server");
const { prisma } = require("@/lib/prisma");
const { requireAdmin } = require("@/lib/requireAdmin");
const { projectSchema } = require("@/lib/validation");

async function PUT(request, { params }) {
  const session = requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = projectSchema.partial().safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const project = await prisma.project.update({
      where: { id: params.id },
      data: parsed.data,
    });

    return NextResponse.json({ project });
  } catch (err) {
    console.error("Update project error:", err);
    return NextResponse.json({ error: "Project not found or update failed" }, { status: 404 });
  }
}

async function DELETE(request, { params }) {
  const session = requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete project error:", err);
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}

module.exports = { PUT, DELETE };
