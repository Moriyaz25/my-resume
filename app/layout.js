import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Mohd Riyaz — Full Stack Web Developer",
  description:
    "Full Stack Developer specializing in React.js, Next.js, and Node.js—building AI-powered dashboards and full-stack business systems.",
  keywords: ["Mohd Riyaz", "Full Stack Developer", "React", "Next.js", "Node.js", "PostgreSQL"],
  openGraph: {
    title: "Mohd Riyaz — Full Stack Web Developer",
    description:
      "Portfolio of Mohd Riyaz, Full Stack Developer specializing in React.js, Next.js, and Node.js.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jbMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem("theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
                  document.documentElement.classList.add("dark");
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
