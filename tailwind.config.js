/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        kiln: "rgb(var(--color-kiln) / <alpha-value>)",
        "kiln-dark": "rgb(var(--color-kiln-dark) / <alpha-value>)",
        sage: "rgb(var(--color-sage) / <alpha-value>)",
        lavender: "rgb(var(--color-lavender) / <alpha-value>)",
        "clay-shadow": "rgb(var(--color-clay-shadow) / <alpha-value>)",
        "clay-light": "rgb(var(--color-clay-light) / <alpha-value>)",
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
        "clay-out":
          "8px 8px 16px rgba(45, 42, 38, 0.12), -6px -6px 14px rgba(255, 253, 249, 0.9)",
        "clay-out-sm":
          "4px 4px 10px rgba(45, 42, 38, 0.10), -3px -3px 8px rgba(255, 253, 249, 0.85)",
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
