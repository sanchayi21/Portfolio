export type SkillIcon = "code" | "layout" | "server" | "database" | "cloud" | "brain" | "test";

export type SkillGroup = {
  category: string;
  icon: SkillIcon;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  { category: "Languages", icon: "code", skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL"] },
  { category: "Frontend", icon: "layout", skills: ["React.js", "Next.js", "Redux", "HTML5", "CSS3"] },
  {
    category: "Backend & APIs",
    icon: "server",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "WebSockets", "JWT Authentication"],
  },
  { category: "Databases & Caching", icon: "database", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  {
    category: "Cloud & DevOps",
    icon: "cloud",
    skills: ["AWS EC2", "AWS S3", "AWS Lambda", "Docker", "GitHub Actions", "CI/CD", "Git"],
  },
  { category: "AI / ML", icon: "brain", skills: ["LLM APIs", "Hugging Face", "OpenAI API", "Groq"] },
  {
    category: "Testing",
    icon: "test",
    skills: ["Jest", "pytest", "Postman", "Unit Testing", "Integration Testing"],
  },
];
