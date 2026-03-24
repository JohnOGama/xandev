export const SKILLS = [
  "React Js",
  "Next Js",
  "Tailwind CSS",
  "GraphQL",
  "Nest Js",
  "React query",
  "Zustand",
  "PostgreSQL",
  "ethers-js",
  "Postman",
  "TypeScript",
];

export type Project = {
  title: string;
  description: string;
  company: string;
  country: string;
  companyLogo: string;
  contributions: string[];
  builtWith: string[];
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
    role: "Software Developer",
    company: "AffirmData",
    employmentType: "Contract",
    location: "United States (Remote)",
    period: "Sep 2025 - Nov 2025",
    highlights: [
      "Migrated a production platform from Bubble to Next.js, NestJS, GraphQL, and PostgreSQL.",
      "Rebuilt and optimized frontend UX for better performance and reliability.",
    ],
  },
  {
    role: "Full-stack Engineer",
    company: "Mobii PH",
    employmentType: "Full-time",
    location: "Philippines (Remote)",
    period: "Jul 2024 - Sep 2025",
    highlights: [
      "Shipped end-to-end features across frontend and backend with Web3 integrations.",
      "Built a mini dApp on KAIA and improved scalability for a large user base.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "1TechHub",
    employmentType: "Part-time",
    location: "Australia (Remote)",
    period: "Nov 2023 - Aug 2025",
    highlights: [
      "Built a scalable analytics admin dashboard from scratch using Next.js.",
      "Converted Figma designs into responsive, production-ready UI and integrated APIs.",
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
