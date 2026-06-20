const { NextResponse } = require("next/server");
const { prisma } = require("@/lib/prisma");
const { contactSchema } = require("@/lib/validation");

async function POST(request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, message } = parsed.data;

    const saved = await prisma.message.create({
      data: { name, email, message },
    });

    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

module.exports = { POST };
