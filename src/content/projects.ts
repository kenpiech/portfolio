// Featured projects. Class work stays private (plagiarism risk), so those
// entries describe the work and never link to source.

export type Category = "Systems" | "Security" | "Distributed" | "Analytics";

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
  linkLabel?: string;
  highlights: string[];
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
    highlights: [
      "REST API in FastAPI to register functions, launch tasks, and fetch status and results.",
      "Redis stores payloads and task state; a pub/sub channel tells the dispatcher about new work.",
      "Three execution modes: local, pull workers over ZeroMQ REQ/REP, and push workers over ROUTER/DEALER.",
      "Worker failures are detected by timeout and covered by fault-tolerance tests.",
      "Technical, testing, and performance reports compare the modes under load.",
    ],
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
    highlights: [
      "Runs commands in foreground and background jobs, with job control.",
      "Signal handlers for interrupts and finished child processes.",
      "Organized as separate C modules for the shell loop, jobs, and signals, with a test suite.",
    ],
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
    highlights: [
      "A start script launches cracker services across a range of ports.",
      "The client splits the search space into chunks and spreads them across the services.",
      "Unit tests, a testing report, and a performance analysis with plots.",
    ],
  },
  {
    slug: "electricity-supply-security",
    title: "Electricity supply security in South Korea",
    summary:
      "Research quantifying South Korea's electricity supply security, with historical values and projections.",
    categories: ["Analytics"],
    stack: ["R", "R Markdown"],
    year: "2021",
    context: "Independent research",
    visibility: "public",
    link: "https://github.com/kp145322/electricity_supply_security",
    highlights: [
      "Combined data from BP and Our World in Data, GIIGNL, Korea’s Ministry of Trade, Industry and Energy, the U.S. EIA, and the World Bank.",
      "Cleaned the datasets and joined them in R using ISO country codes.",
      "Compared historical supply security with projections under Korea’s 9th Basic Plan for electricity.",
    ],
  },
  {
    slug: "bellabeat",
    title: "Fitness tracker analysis for Bellabeat",
    summary:
      "A case study for the Google Data Analytics Certificate: cleaning and analyzing Fitbit data in R to find usage trends for a wellness-tech company.",
    categories: ["Analytics"],
    stack: ["R", "tidyverse", "GGally", "R Markdown"],
    year: "2021",
    context: "Google Data Analytics Certificate",
    visibility: "public",
    link: "https://kp145322.github.io/Rprojects/",
    linkLabel: "Read the full analysis →",
    highlights: [
      "Cleaned and merged daily activity and sleep logs from 33 Fitbit users, flagging days when a device wasn’t worn or charged.",
      "Found that steps track closely with active minutes, and that more sedentary time goes with less sleep.",
      "Turned the findings into product and marketing recommendations, with the sample’s limits stated up front.",
    ],
  },
];

export const categories: Category[] = ["Systems", "Security", "Distributed", "Analytics"];
