const nodemailer = require("nodemailer");

function getMailConfig() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL || user;

  if (!user || !pass || !to) {
    return null;
  }

  return { user, pass, to };
}

async function sendContactEmail({ name, email, message }) {
  const config = getMailConfig();

  if (!config) {
    return { skipped: true };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: `"Riyaz Portfolio" <${config.user}>`,
    to: config.to,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: [
      "You received a new message from your portfolio contact form.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2 style="margin: 0 0 12px;">New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 14px; border-radius: 12px; background: #fff4ea; border: 1px solid #f0d6c4;">
          ${escapeHtml(message).replace(/\n/g, "<br />")}
        </div>
      </div>
    `,
  });

  return { skipped: false };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = { sendContactEmail };
