export const SKILL_GROUPS = [
  {
    label: "Languages",
    skills: ["TypeScript", "JavaScript"],
  },
  {
    label: "Frontend",
    skills: ["React Js", "React Native Expo", "Next Js", "Tailwind CSS", "Zustand", "React query", "ShadCN UI", "Redux"],
  },
  {
    label: "Backend & Database",
    skills: ["Nest Js", "Node Js", "GraphQL", "PostgreSQL", "TypeORM", "Drizzle ORM"],
  },
  {
    label: "Tools & Infrastructure",
    skills: ["Git", "Docker", "Jenkins", "AWS S3", "Vercel", "Railway", "Postman", "Jest"],
  },
  {
    label: "Web3",
    skills: ["ethers-js", "Privy Auth"],
  },
  {
    label: "AI",
    skills: ["Claude", "Cursor", "Antigravity"],
  },
];

export type Project = {
  title: string;
  description: string;
  company: string;
  country: string;
  companyLogo: string;
  contributions: string[];
  builtWith: string[];
  url?: string;
};

export type WorkTimelineItem = {
  role: string;
  company: string;
  employmentType: string;
  location: string;
  period: string;
  highlights: string[];
};

export const WORK_TIMELINE: WorkTimelineItem[] = [
  {
    role: "Frontend Developer",
    company: "Geiger",
    employmentType: "Full-time",
    location: "United States (Remote)",
    period: "Mar 2026 - Nov 2026",
    highlights: [
      "Migrated the site from C8 to C11, using Payload CMS to build the e-commerce platform.",
      "Worked on the ERP system to replicate how the C8 version was set up in C11.",
      "Coordinated closely with the Account Manager to clarify store requirements and ensure data was aligned before migrating to C11.",
    ],
  },
  {
    role: "Frontend Developer | AI-Driven Development",
    company: "WYNTAP Inc",
    employmentType: "Contract",
    location: "Philippines (Remote)",
    period: "Nov 2025 - Feb 2026",
    highlights: [
      "Utilized AI-assisted development tools such as Cursor AI to improve development efficiency and accelerate feature delivery.",
      "Handled the full frontend of a backoffice bulk upload tool — built the UI, wired up the Excel file processing flow, and integrated the backend APIs to automate user data onboarding.",
      "Developed the frontend for a Google Drive-like file management feature, converting Figma designs into a fully working Angular interface with complete API integration.",
      "Maintained the UpEnglish IELTS platform by fixing bugs, resolving UI issues, and making code improvements to keep the platform stable and reliable for active users.",
    ],
  },
  {
    role: "Software Developer",
    company: "AffirmData",
    employmentType: "Contract",
    location: "United States (Remote)",
    period: "Sept 2025 - Nov 2025",
    highlights: [
      "The client's app built on Bubble (no-code) was suffering from infinite loading, slow renders, and no pagination — making it unusable for heavy data workflows.",
      "Owned the frontend side of the migration from Bubble to Next.js — rebuilt all views from scratch with proper pagination, skeleton loading, and an improved UI/UX and working alongside the backend team on NestJS, PostgreSQL, and GraphQL.",
      "Resolved all critical performance issues within 2 months — the app went from broken and slow to fully functional, with faster load times, stable rendering, and an improved overall UI/UX.",
    ],
  },
  {
    role: "Full-stack Engineer",
    company: "Mobii PH",
    employmentType: "Full-time",
    location: "Philippines (Remote)",
    period: "July 2024 - Sept 2025",
    highlights: [
      "Developed a mini dApp on the KAIA blockchain that served more than 200,000 registered users within the LINE ecosystem.",
      "Integrated smart contracts and multi-chain features using Ethers.js and Privy Auth, enabling secure wallet authentication and contract interactions.",
      "Collaborated with designer to convert Figma designs into production-ready React components and implemented waitlist features to support user onboarding.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "1TechHub",
    employmentType: "Freelance",
    location: "Australia (Remote)",
    period: "Nov 2023 - Aug 2025",
    highlights: [
      "Built a modular admin dashboard using Next.js with reusable components to support long-term scalability and maintenance.",
      "Converted Figma designs into responsive and consistent user interfaces across multiple screen sizes.",
      "Improved application responsiveness using Zustand and optimistic UI updates while reducing unnecessary API requests.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "TaskMe",
    description:
      "A complete freelance job platform allowing employers to post projects and hire contractors securely. The application handles all workflow essentials, including secure Stripe transactions, contract management, time tracking, and real-time communication for a fast and transparent experience.",
    company: "AffirmData",
    country: "United States",
    companyLogo: "/logos/affirmdata-logo.png",
    contributions: [
      "Migrated the website builder from Bubble to Next.js and Tailwind CSS.",
      "Developed timesheet tracking, job management, and invoicing features for freelancers and employers.",
      "Collaborated with the team on both frontend and backend development.",
      "Integrated Zustand for efficient and scalable state management.",
      "Built reusable components and implemented lazy loading to enhance performance.",
      "Implemented infinite scrolling and skeleton loading for smoother user experience.",
      "Configured and integrated NextIntl to enable locale-based internationalization.",
      "Utilized TypeScript throughout development for type safety, scalability, and improved documentation.",
    ],
    builtWith: ["Next Js", "Tailwind CSS", "PostgreSQL", "Nest Js", "GraphQL", "Zustand", "TypeScript"],
  },
  {
    title: "Analytics Admin Dashboard",
    description:
      "Built an admin dashboard for analytics and converted designs into a fully functional web application, with clear insights into activity and performance and efficient data management.",
    company: "1TechHub",
    country: "Philippines",
    companyLogo: "/logos/default.jpg",
    contributions: [
      "Structured and developed the entire project codebase from scratch.",
      "Converted Figma designs into a fully functional web application using Next.js and Tailwind CSS.",
      "Implemented backend endpoints supporting pagination, queries, and filtering.",
      "Leveraged Zustand for state and data management.",
      "Integrated REST API endpoints for dynamic data handling.",
    ],
    builtWith: ["Next Js", "Tailwind CSS", "Zustand", "TypeScript"],
  },
  {
    title: "Futr",
    description: "Futr is a Web3-based prediction and social platform that allows users to predict event outcomes and connect with other predictors.",
    company: "Mobii PH",
    country: "Philippines",
    companyLogo: "/logos/mobii-logo.jpeg",
    contributions: [
      "Converted Figma designs into a responsive web application using Next.js and Tailwind CSS.",
      "Developed a scalable blockchain chain-switcher component for frontend and backend integration.",
      "Integrated Ethers.js to handle blockchain transactions, including buy, sell, reward distribution, and balance retrieval.",
      "Integrated RESTful APIs in NestJS for efficient data fetching and manipulation.",
      "Utilized React Query for optimized data fetching, revalidation, and caching to enhance application performance.",
      "Implemented drag-and-drop functionality for social profile customization.",
      "Collaborated with the team across frontend and backend development.",
      "Onboarded new developers and contributed to project documentation.",
      "Debugged and resolved issues to improve system reliability.",
      "Actively collaborated with the team to enhance product stability and performance.",
    ],
    builtWith: ["Next Js", "Tailwind CSS", "Nest Js", "ethers-js", "React query", "Zustand", "TypeScript", "PostgreSQL"],
  },
  {
    title: "Second Breakfast",
    description: "Second Breakfast is a sister company landing page for Futr, created to represent its connected brand and offerings.",
    company: "Mobii PH",
    country: "Philippines",
    companyLogo: "/logos/mobii-logo.jpeg",
    contributions: [
      "Converted Figma designs into a responsive landing page using Next.js and Tailwind CSS.",
      "Onboarded new developers and assisted in environment setup.",
      "Improved folder structure and maintained clean, organized code architecture.",
    ],
    builtWith: ["React Js", "Tailwind CSS"],
  },
  {
    title: "Futr | Mini Dapp",
    description: "Futr Minidapp is a blockchain-based prediction application similar to Futr, but built on top of the LIFF LINE platform and the KAIA chain.",
    company: "Mobii PH",
    country: "Philippines",
    companyLogo: "/logos/mobii-logo.jpeg",
    contributions: [
      "Developed the frontend using a single-page application (SPA).",
      "Built reusable content-rendering components and optimized performance with useMemo, memo, and useCallback.",
      "Contributed to debugging, testing, and performance improvements.",
    ],
    builtWith: ["Next Js", "Tailwind CSS", "Nest Js", "Zustand", "TypeScript", "PostgreSQL"],
  },
  {
    title: "Back to the Futr",
    description: "Back to the Futr is the main landing page of Futr and also serves as a waitlist page for new users.",
    company: "Mobii PH",
    country: "Philippines",
    companyLogo: "/logos/mobii-logo.jpeg",
    contributions: [
      "Redesigned and optimized the landing page for improved performance and user engagement.",
      "Implemented a carousel component using ShadCN UI.",
      "Enhanced mobile responsiveness.",
      "Integrated GetWaitlist third-party service to track registered users.",
    ],
    builtWith: ["Next Js", "Tailwind CSS", "Zustand"],
  },
  {
    title: "MyUse Waitlist",
    description: "Waitlist page for the MyUse fashion assistant application.",
    company: "Mobii PH",
    country: "Philippines",
    companyLogo: "/logos/mobii-logo.jpeg",
    contributions: [
      "Developed the waitlist page using React.js (Vite) and Tailwind CSS.",
      "Converted Figma designs into a functional and responsive web interface.",
      "Integrated GetWaitlist third-party service for user registration tracking.",
    ],
    builtWith: ["React Js", "Tailwind CSS", "Zustand"],
  },
];

export const GITHUB_LINK = "https://github.com/JohnOGama";
export const LINKEDIN_LINK = "https://www.linkedin.com/in/johnogama/";

// "TaskMe" -> "TM": first two capitals, else the first two letters.
export const initials = (title: string) => {
  const caps = title.replace(/[^A-Z]/g, "");
  return (caps.length >= 2 ? caps : title).slice(0, 2).toUpperCase();
};

export const projectUsesSkill = (project: Project, skill: string) =>
  project.builtWith.some(
    (tech) =>
      tech.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(tech.toLowerCase())
  );

// Home page chips: only skills that at least one project uses, so every chip filters to something.
export const FILTER_SKILLS = SKILL_GROUPS.flatMap((group) => group.skills).filter(
  (skill) => PROJECTS.some((project) => projectUsesSkill(project, skill))
);
