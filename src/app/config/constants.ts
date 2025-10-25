export const SKILLS = [
  "React Js",
  "Next Js",
  "Tailwind CSS",
  "GraphQL",
  "Nest Js",
  "React query",
  "Zustand",
  "Redux toolkit",
  "PostgreSQL",
  "ethers-js",
  "Postman",
];

export type Project = {
  title: string;
  description: string;
  company: string;
  country: string;
  companyLogo: string;
  builtWith: string[];
};

export const PROJECTS: Project[] = [
  {
    title: "TaskMe",
    description:
      "A complete freelance job platform allowing employers to post projects and hire contractors securely. The application handles all workflow essentials, including secure Stripe transactions, contract management, time tracking, and real-time communication for a fast and transparent experience.",
    company: "AffirmData",
    country: "United States",
    companyLogo: "/logos/affirmdata-logo.png",
    builtWith: [
      "Next Js",
      "Tailwind CSS",
      "PostgreSQL",
      "Nest Js",
      "GraphQL",
      "Better-auth",
      "Zustand",
    ],
  },
  {
    title: "Stateji Admin",
    description:
      "Stateji Admin provides analytics for users, companies, and workspaces, offering clear insights into activity and performance. It enables efficient data management through create, update, and delete functionalities, as well as manual user invitations for those who have not yet been added to the application.",
    company: "Stateji",
    country: "Australia",
    companyLogo:
      "https://cdn.prod.website-files.com/65f44d7ae68310dc9fb4981f/65f45733d51d114d0045d54b_strateji-logo.svg",
    builtWith: ["Next Js", "Tailwind CSS", "Zustand"],
  },
  {
    title: "Stateji",
    description:
      "Strateji helps managers and leaders to effectively plan and manage their teams, transforming strategies into actionable plans, and vice versa.",
    company: "Stateji",
    country: "Australia",
    companyLogo:
      "https://cdn.prod.website-files.com/65f44d7ae68310dc9fb4981f/65f45733d51d114d0045d54b_strateji-logo.svg",
    builtWith: [
      "React Js",
      "Tailwind CSS",
      "React query",
      "react-router",
      "Zustand",
    ],
  },
  {
    title: "Futr",
    description:
      "Futr is a Web3-based prediction and social platform that allows users to predict an event outcomes and connect with other predictors.",
    company: "Mobii PH",
    country: "Philippines",
    companyLogo: "/logos/mobii-logo.jpeg",
    builtWith: [
      "Next Js",
      "Tailwind CSS",
      "PostgreSQL",
      "Nest Js",
      "Ether Js",
      "React-query",
      "Zustand",
    ],
  },
  {
    title: "Second Breakfast",
    description:
      "Second Breakfast is a sister company landing page for Futr, created to represent its connected brand and offerings.",
    company: "Mobii PH",
    country: "Philippines",
    companyLogo: "/logos/mobii-logo.jpeg",
    builtWith: [
      "Next Js",
      "Tailwind CSS",
      "PostgreSQL",
      "Nest Js",
      "Ether Js",
      "React-query",
      "Zustand",
    ],
  },
  {
    title: "Futr | Mini Dapp",
    description:
      "Futr Minidapp is a blockchain-based prediction application similar to Futr, but built on top of the LIFF LINE platform and the KAIA chain.",
    company: "Mobii PH",
    country: "Philippines",
    companyLogo: "/logos/mobii-logo.jpeg",
    builtWith: [
      "Next Js",
      "Tailwind CSS",
      "PostgreSQL",
      "Nest Js",
      "LIFF-LINE",
      "Zustand",
    ],
  },
  {
    title: "Back to the Futr",
    description:
      "Back to the Futr is the main landing page of Futr and also serves as a waitlist page for new users.",
    company: "Mobii PH",
    country: "Philippines",
    companyLogo: "/logos/mobii-logo.jpeg",
    builtWith: ["Next Js", "Tailwind CSS", "GetWaitlist", "Zustand"],
  },
  {
    title: "MyUse waitlist",
    description: "Waitlist page for the MyUse fashion assistant application.",
    company: "Mobii PH",
    country: "Philippines",
    companyLogo: "/logos/mobii-logo.jpeg",
    builtWith: ["React Js", "Tailwind CSS", "GetWaitlist", "Zustand"],
  },
];

export const GITHUB_LINK = "https://github.com/JohnOGama";
export const LINKEDIN_LINK = "https://www.linkedin.com/in/johnogama/";
