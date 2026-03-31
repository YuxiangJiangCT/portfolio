export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "Java", "TypeScript", "JavaScript", "C++", "SQL", "Solidity"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Spring Boot", "Node.js", "Express", "Django"],
  },
  {
    category: "Frontend",
    items: ["React", "Vue.js", "Tailwind CSS", "Chrome Extension API"],
  },
  {
    category: "Data & Storage",
    items: ["PostgreSQL", "Redis", "MySQL", "MongoDB", "Supabase"],
  },
  {
    category: "Infrastructure",
    items: ["Docker", "AWS (EC2, CodePipeline)", "Nginx", "GitHub Actions", "CI/CD"],
  },
  {
    category: "Tools",
    items: ["Git", "Linux", "k6", "Postman", "Streamlit", "Hardhat"],
  },
];
