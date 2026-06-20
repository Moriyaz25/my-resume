/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFF8F0",      // warm putty white — base background
        ink: "#2D2A26",         // warm near-black — primary text
        kiln: "#E8643C",        // kiln orange — primary accent
        "kiln-dark": "#C94E29",
        sage: "#6B8F71",        // sage clay — secondary accent (tags, success)
        lavender: "#C8A8D8",    // muted lavender — admin-only accent
        "clay-shadow": "#F0E4D4", // warm shadow tone for dual clay shadows
        "clay-light": "#FFFDF9",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
      borderRadius: {
        clay: "2rem",
        "clay-sm": "1.25rem",
        "clay-lg": "3rem",
      },
      boxShadow: {
        // Outset clay: object pressed up out of the canvas
        "clay-out":
          "8px 8px 16px rgba(45, 42, 38, 0.12), -6px -6px 14px rgba(255, 253, 249, 0.9)",
        "clay-out-sm":
          "4px 4px 10px rgba(45, 42, 38, 0.10), -3px -3px 8px rgba(255, 253, 249, 0.85)",
        // Inset clay: pressed into the canvas (active/pressed states)
        "clay-in":
          "inset 6px 6px 12px rgba(45, 42, 38, 0.14), inset -4px -4px 10px rgba(255, 253, 249, 0.8)",
        "clay-hover":
          "10px 10px 22px rgba(45, 42, 38, 0.16), -8px -8px 18px rgba(255, 253, 249, 0.95)",
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1.5deg)" },
        },
      },
    },
  },
  plugins: [],
};
