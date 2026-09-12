import type { ComponentType, ReactNode } from "react";

import { Icons } from "@/components/icons";
import { FolderIcon, HomeIcon } from "lucide-react";

/** Anything that renders as a small logo: a lucide icon or one of our SVGs. */
type IconComponent = ComponentType<{ className?: string }>;

type Social = {
  name: string;
  url: string;
  icon: IconComponent;
  navbar: boolean;
};

type SkillGroup = {
  category: string;
  items: string[];
};

type Role = {
  title: string;
  start: string;
  end: string;
  /** Bullets for this position. Omit to show the title and dates only. */
  highlights?: string[];
};

/** A LinkedIn-style attachment card shown under a job. */
type WorkLink = {
  title: string;
  href: string;
  /** Path under public/. Falls back to the company logo. */
  image?: string;
  /** Tile background, any CSS colour. Defaults to the card background. */
  background?: string;
};

type Work = {
  company: string;
  /** Company website. Leave empty if there is none. */
  href: string;
  /** "Full-time", "Freelance", "Self-employed", ... */
  employmentType: string;
  location: string;
  title: string;
  /** Path under public/, e.g. "/precize.png". Empty renders a placeholder. */
  logoUrl: string;
  start: string;
  /** Use "Present" for the current role. */
  end: string;
  /** Optional: more than one title at the same company, newest first. Each
   *  role can carry its own highlights. */
  roles?: Role[];
  /** Optional one-line context above the bullets. */
  description?: string;
  /** Company-level bullets. Leave empty when the roles carry their own. */
  highlights: string[];
  /** Optional link cards rendered under the bullets. */
  links?: WorkLink[];
};

type Education = {
  school: string;
  href: string;
  degree: string;
  logoUrl: string;
  start: string;
  end: string;
  description?: string;
};

type ProjectLink = {
  type: string;
  href: string;
  icon: ReactNode;
};

type Project = {
  title: string;
  /** Groups the card on the page. Any new string becomes a new group,
   *  rendered in the order it first appears below. */
  kind: string;
  href: string;
  dates: string;
  /** Optional badge on the card, e.g. "Fiverr client". Omit for personal work. */
  context?: string;
  active: boolean;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  /** Path under public/. Empty renders a neutral placeholder. */
  image: string;
  video: string;
};

type Hackathon = {
  title: string;
  dates: string;
  location: string;
  description: string;
  image?: string;
  links?: { title: string; href: string; icon?: ReactNode }[];
};

type Resume = {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  description: string;
  /** Markdown. Links and emphasis work here. */
  summary: string;
  avatarUrl: string;
  skills: SkillGroup[];
  navbar: { href: string; icon: IconComponent; label: string }[];
  contact: {
    email: string;
    tel: string;
    social: Record<string, Social>;
  };
  work: Work[];
  education: Education[];
  projects: Project[];
  hackathons: Hackathon[];
};

/**
 * Everything on the site comes from this file.
 *
 * To add an experience, project, school, skill or hackathon, add an object (or
 * a plain string, for skills) to the matching array below. Nothing else needs
 * to change: the sections render whatever is here, in order, and hide
 * themselves when their array is empty.
 *
 * Logos live in public/logos/<category>/ and are referenced by path, e.g.
 * logoUrl: "/logos/work/precize.png". Project screenshots go in public/ too.
 * Leave the string empty and a neutral placeholder renders instead.
 */
export const DATA: Resume = {
  name: "Deepak Maurya",
  initials: "DM",
  url: "https://deep-maurya.github.io",
  location: "Mumbai, Maharashtra, India",
  locationLink: "https://www.google.com/maps/place/mumbai",
  description:
    "I build web and native mobile products, from the first screen to the release pipeline.",
  summary:
    "I am a Software Engineer II at [Precize](https://www.precize.in), where I build the Next.js investment dashboard and the React Native app behind a pre-IPO share platform. I like owning a feature end to end, from interface architecture and state design through authentication, release automation and the rollout that puts it in front of people.\n\nFour years across fintech and logistics. My depth is on the frontend, with enough range in the Node.js and Fastify services on PostgreSQL behind it to carry a feature the whole way rather than hand it off halfway. Lately I build with the AI stack too: Mastra, LangChain, RAG pipelines and MCP.",
  // TODO(deepak): drop a square photo at public/me.png. Until then the avatar
  // falls back to the initials above.
  avatarUrl: "/me.png",

  // Add a skill by adding a string. Logos are optional and live in
  // src/data/skill-icons.tsx; anything without one renders as a text chip.
  //
  // Kept deliberately short: only tools someone would hire for, ordered by
  // depth. What you did with them belongs in the work bullets, not here.
  skills: [
    {
      category: "Frontend",
      items: [
        "TypeScript",
        "React",
        "Next.js",
        "React Native",
        "Expo",
        "Tailwind CSS",
        "Zustand",
        "Redux",
      ],
    },
    {
      category: "Backend",
      items: ["Node.js", "Fastify", "Express", "Prisma", "BullMQ"],
    },
    {
      category: "AI & LLM",
      items: ["Mastra", "LangChain", "RAG", "MCP", "Vector search"],
    },
    {
      category: "Data",
      items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "AWS Cognito", "Cloudflare", "Expo EAS", "CI/CD", "Git"],
    },
    {
      category: "Analytics & Monitoring",
      items: ["PostHog", "GA4", "Meta Pixel", "AppsFlyer"],
    },
  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
  ],

  contact: {
    email: "deepakmauryahd@gmail.com",
    tel: "+91 78410 25544",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/deep-maurya",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/deepakmaurya47/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:deepakmauryahd@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  // Newest first. `roles` is optional: use it when you held more than one
  // title at the same company. `highlights` renders as bullets.
  work: [
    {
      company: "Precize (Pazago)",
      href: "https://www.precize.in",
      employmentType: "Full-time",
      location: "Mumbai, Maharashtra, India · On-site",
      title: "Software Engineer II",
      logoUrl: "/logos/work/precize.png",
      start: "October 2024",
      end: "Present",
      // NOTE(deepak): the split below is inferred, not something you told me.
      // The read is: hired onto the web dashboard and growth instrumentation,
      // promoted at six months, then owned mobile and the auth/release work
      // around it. If a bullet sat in the other period, move the string
      // between these two arrays; nothing else needs to change.
      roles: [
        {
          title: "Software Engineer II",
          start: "April 2025",
          end: "Present",
          highlights: [
          "Built and shipped the investor mobile app to the **App Store and Play Store**: **25+ screens** in React Native and Expo, covering KYC onboarding, portfolio, order placement and wallet.",
          "Shipped a **B2B partner module** for investing on behalf of institutional clients, and an **Auto-Invest** flow scheduling recurring mandates on BullMQ with retry handling on failed debits.",
          "Automated the mobile release pipeline with per-environment EAS profiles, auto-submit workflows and OTA updates, turning a **2-3 day store review** into minutes for JS-only fixes. **Release effort down ~85%.**",
          "Added **biometric and PIN re-entry** with expo-secure-store, hashed and device-bound, so an expired session resumes in **under 2 seconds** instead of a full OTP login.",
          "Implemented **Sign in with Apple** end to end, verifying identity tokens against Apple's JWKS on Fastify and handling Hide My Email relay addresses when linking existing accounts.",
          "Built **cross-device force logout** on a per-user revocation epoch cached in Redis, cutting **~95% of per-request identity provider calls**.",
          ],
        },
        {
          title: "Software Engineer I",
          start: "October 2024",
          end: "March 2025",
          highlights: [
          "Rebuilt the dashboard's account and portfolio pages on the **Next.js App Router**, streaming from React Server Components and virtualizing tables to **5,000+ rows** without pagination. **Load time down ~40%.**",
          "Built the **unlisted-share price chart**, interpolating a continuous series from a sparse feed of real trade events, with timeframe switching and hover tooltips in Zustand.",
          "Built **multi-touch attribution** in Prisma with first and last touch resolution and lazy backfill, taking channel coverage of new signups to **~100%**.",
          "Integrated **PostHog** for product events and error monitoring, and the **Meta Conversions API** with hashed identifiers, event deduplication and server-side purchase events from the payment webhook.",
          ],
        },
      ],
      description: "",
      highlights: [],
      links: [
        {
          title: "Precize | Buy and sell unlisted and pre-IPO shares",
          href: "https://www.precize.in",
          image: "/logos/work/precize.png",
          background: "#ffffff",
        },
        {
          title: "Precize | Invest in unlisted & pre-IPO shares - Google Play",
          href: "https://play.google.com/store/apps/details?id=com.precize",
          image: "/logos/work/precize-app.png",
          // Sampled from the app icon so the tile reads as one piece.
          background: "#11121B",
        },
      ],
    },
    {
      company: "Webvision Softech Pvt. Ltd.",
      href: "",
      employmentType: "Freelance",
      location: "Vasai, Maharashtra, India · Remote",
      title: "Full Stack Engineer",
      logoUrl: "/logos/work/webvision.png",
      start: "November 2023",
      end: "August 2024",
      description:
        "Business management platforms and internal software built with PHP and MySQL.",
      highlights: [
        "Developed a referral-based marketing platform with **multi-tier commission calculation** and automated payouts, replacing a manual spreadsheet cycle.",
        "Built an **inventory management system** tracking stock levels, orders and product movement.",
      ],
    },
    {
      company: "Fiverr",
      href: "https://www.fiverr.com/deepak__maurya",
      employmentType: "Self-employed",
      location: "Remote",
      title: "Freelance Web Developer",
      logoUrl: "/logos/work/fiverr.svg",
      start: "February 2023",
      end: "December 2023",
      description: "",
      highlights: [
        "Delivered **20+ full-stack applications** for international clients at a **4.7 / 5 rating**.",
        "Integrated **Razorpay, Cashfree and PayU** for client collections and payouts.",
        "Built a **TRON-based crypto wallet** tracking USDT transactions with automated on-chain confirmation.",
        "Owned the full lifecycle remotely, from requirements and system design through deployment and handover.",
      ],
      links: [
        {
          title: "Deepak Maurya | Profile | Fiverr",
          href: "https://www.fiverr.com/deepak__maurya",
          image: "/logos/work/fiverr-white.svg",
          background: "#1DBF73",
        },
      ],
    },
  ],

  education: [
    {
      school: "Masai School",
      href: "https://www.masaischool.com/",
      degree: "Full Stack Web Development Program (Full-Time)",
      logoUrl: "/logos/education/masai.png",
      start: "January 2024",
      end: "October 2024",
      description:
        "Certificate ID MASAI-FT33-183. Built and deployed full-stack applications with REST APIs and CI/CD tooling, working in agile sprints with pair programming.",
    },
    {
      school: "University of Mumbai",
      href: "https://mu.ac.in/",
      degree: "B.Sc. Information Technology",
      logoUrl: "/logos/education/university-of-mumbai.png",
      start: "2018",
      end: "2021",
      description:
        "Bhaskar Waman Thakur College of Science. CGPA 8.77.",
    },
  ],

  projects: [
    {
      title: "Precize",
      kind: "Apps & sites",
      href: "https://www.precize.in",
      // TODO(deepak): set the real start date.
      dates: "2024 - Present",
      active: true,
      description:
        "The pre-IPO and unlisted share investing platform I build at Precize. Rebuilt the account and portfolio pages on the **Next.js App Router**, moving data fetching into React Server Components with streaming so holdings paint before slower valuation calls resolve, and virtualizing the holdings and order-history tables to **5,000+ rows** without pagination. **Load time down ~40%.** Also built the unlisted-share price chart, interpolating a continuous series from a sparse feed of real trade events.",
      technologies: [
        "Next.js",
        "React Server Components",
        "React Virtualized",
        "Zustand",
        "TypeScript",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.precize.in",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      // Precize's own landing-page preview image.
      image: "/projects/precize.jpg",
      video: "",
    },
    {
      title: "Precize App",
      kind: "Apps & sites",
      href: "https://play.google.com/store/apps/details?id=com.precize",
      // TODO(deepak): set the real ship date. The Play Store only exposes the
      // last update, not the original release.
      dates: "2025 - Present",
      active: true,
      description:
        "The React Native investor app, shipped to the **App Store and Play Store**. **25+ screens** covering KYC onboarding, portfolio, holding detail, order placement and wallet, with biometric and PIN re-entry, Sign in with Apple, and an automated EAS release pipeline whose OTA updates land JS-only fixes in minutes instead of a **2-3 day store review**.",
      technologies: [
        "React Native",
        "Expo",
        "Expo Router",
        "NativeWind",
        "EAS",
      ],
      links: [
        {
          type: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.precize",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      // Cropped from the public Play Store listing.
      image: "/projects/precize-app.jpg",
      video: "",
    },
    {
      title: "BharatPin",
      kind: "Packages",
      href: "https://www.npmjs.com/package/bharatpin",
      dates: "February 2025",
      active: true,
      description:
        "A lightweight Node.js package for Indian PIN code lookup, returning post office name, district and state through a single async call. Published on npm as a smaller alternative to the existing options.",
      technologies: ["Node.js", "JavaScript", "npm"],
      links: [
        {
          type: "npm",
          href: "https://www.npmjs.com/package/bharatpin",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/deep-maurya/Bharat-pin",
          icon: <Icons.github className="size-3" />,
        },
      ],
      // TODO(deepak): add a screenshot to public/ and reference it here.
      image: "",
      video: "",
    },
    {
      title: "TopupBuddy",
      kind: "Apps & sites",
      href: "https://topup-buddy.vercel.app",
      dates: "September 2024",
      active: true,
      description:
        "A wallet-based mobile and DTH recharge platform. Users top up a wallet once and recharge from it, with authentication and secure payments throughout.",
      technologies: ["React", "Vite", "Node.js", "MongoDB", "Mongoose"],
      links: [
        {
          type: "Website",
          href: "https://topup-buddy.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/deep-maurya/TopupBuddy",
          icon: <Icons.github className="size-3" />,
        },
      ],
      // Captured from the live site.
      image: "/projects/topupbuddy.jpg",
      video: "",
    },
    {
      title: "Tronenegy",
      kind: "Apps & sites",
      href: "https://tronenegy.com",
      // TODO(deepak): narrowed from the Fiverr period you placed it in.
      // Set the real month if you have it.
      dates: "2023",
      context: "Fiverr client",
      active: true,
      description:
        "Renting TRON energy cuts the fee on a USDT transfer by up to **90%**, so this site puts live rates from providers like feee.io, TronSave and TokenGoodies side by side, with guides covering how renting actually works.",
      // Detected from the live site.
      technologies: ["Next.js", "React", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://tronenegy.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      // Captured from the live site.
      image: "/projects/tronenegy.jpg",
      video: "",
    },
    {
      title: "Green Bhavishya",
      kind: "Apps & sites",
      href: "https://greenbhavishya.com",
      // TODO(deepak): narrowed from the Fiverr period you placed it in.
      dates: "2023",
      context: "Fiverr client",
      active: true,
      description:
        "A member platform for a green energy and tree-planting business: public site with products and gallery, plus registration and login for the business network behind it.",
      // TODO(deepak): Bootstrap and jQuery are detected from the live site;
      // PHP and MySQL are inferred from your stack in that period. Correct
      // these if wrong.
      technologies: ["PHP", "MySQL", "Bootstrap", "jQuery"],
      links: [
        {
          type: "Website",
          href: "https://greenbhavishya.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      // Captured from the live site.
      image: "/projects/greenbhavishya.jpg",
      video: "",
    },
  ],

  // Newest first. The section hides itself when this array is empty.
  hackathons: [
    {
      title: "Masai × NoBroker",
      dates: "October 2025",
      // TODO(deepak): was this on-site or online? Leave empty to hide the line.
      location: "",
      description:
        "Built Public Pulse with Anubhav Maurya and Palak Surana: a civic issue reporting platform that replaces complain-and-hope with report, upvote and track. Map-pinned reports with photo evidence, shareable issue links, a per-issue status timeline and email notifications when something moves. Two days, start to shipped.",
      image: "/logos/hackathons/nobroker.png",
      links: [
        {
          title: "Live",
          href: "https://civic-issue-frontend.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          title: "Source",
          href: "https://github.com/deep-maurya/civic-issue-frontend",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
  ],
};
