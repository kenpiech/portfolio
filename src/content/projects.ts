// Featured projects. Class work stays private (plagiarism risk), so those
// entries describe the work and never link to source.

export type Category = "Systems" | "Security" | "Distributed" | "Research";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  categories: Category[];
  stack: string[];
  year: string;
  context: string;
  team?: string;
  visibility: "public" | "private";
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "mpcsfaas",
    title: "MPCSFaaS",
    summary:
      "A function-as-a-service platform: register Python functions, run them on remote workers, and fetch results asynchronously.",
    categories: ["Distributed", "Systems"],
    stack: ["Python", "FastAPI", "Redis", "ZeroMQ", "pytest"],
    year: "2026",
    context: "UChicago MPCS",
    team: "with Nic",
    visibility: "private",
  },
  {
    slug: "msh",
    title: "msh",
    summary: "A Unix shell in C with job control, background processes, and signal handling.",
    categories: ["Systems"],
    stack: ["C", "POSIX", "Make"],
    year: "2026",
    context: "UChicago MPCS",
    visibility: "private",
  },
  {
    slug: "password-cracker",
    title: "Distributed password cracker",
    summary:
      "Splits an MD5 brute-force search across a fleet of Flask services and measures how it scales.",
    categories: ["Security", "Distributed"],
    stack: ["Python", "Flask", "MD5"],
    year: "2026",
    context: "UChicago MPCS",
    visibility: "private",
  },
  {
    slug: "electricity-supply-security",
    title: "Electricity supply security in South Korea",
    summary:
      "Research quantifying South Korea's electricity supply security, with historical values and projections.",
    categories: ["Research"],
    stack: ["R", "R Markdown"],
    year: "2021",
    context: "Independent research",
    visibility: "public",
    link: "https://github.com/kp145322/electricity_supply_security",
  },
];

export const categories: Category[] = ["Systems", "Security", "Distributed", "Research"];
