const { cookies } = require("next/headers");
const { verifySession, COOKIE_NAME } = require("@/lib/auth");

/**
 * Returns the decoded session if valid, or null if not authenticated.
 * Use at the top of any protected admin API route.
 */
function requireAdmin() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

module.exports = { requireAdmin };
