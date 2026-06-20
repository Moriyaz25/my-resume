const { NextResponse } = require("next/server");
const { prisma } = require("@/lib/prisma");
const { requireAdmin } = require("@/lib/requireAdmin");

async function PUT(request, { params }) {
  const session = requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const message = await prisma.message.update({
      where: { id: params.id },
      data: { read: Boolean(body.read) },
    });
    return NextResponse.json({ message });
  } catch (err) {
    console.error("Update message error:", err);
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }
}

async function DELETE(request, { params }) {
  const session = requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.message.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete message error:", err);
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }
}

module.exports = { PUT, DELETE };
