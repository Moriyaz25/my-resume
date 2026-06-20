const { z } = require("zod");

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

const projectSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  title: z.string().min(2).max(120),
  summary: z.string().min(5).max(200),
  description: z.string().min(10),
  techStack: z.array(z.string()).default([]),
  metrics: z.array(z.string()).default([]),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

const experienceSchema = z.object({
  company: z.string().min(2).max(120),
  role: z.string().min(2).max(120),
  duration: z.string().min(2).max(60),
  type: z.string().min(2).max(40),
  bullets: z.array(z.string()).default([]),
  order: z.number().int().default(0),
});

const skillSchema = z.object({
  name: z.string().min(1).max(60),
  category: z.string().min(1).max(60),
  order: z.number().int().default(0),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

module.exports = {
  contactSchema,
  projectSchema,
  experienceSchema,
  skillSchema,
  loginSchema,
};
