const jwt = require("jsonwebtoken");

const COOKIE_NAME = "admin_session";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function signSession(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

function verifySession(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

module.exports = { COOKIE_NAME, signSession, verifySession };
