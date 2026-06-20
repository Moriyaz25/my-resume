const { NextResponse } = require("next/server");
const { COOKIE_NAME } = require("@/lib/auth");

async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return response;
}

module.exports = { POST };
