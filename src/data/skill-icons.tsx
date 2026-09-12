import type { ComponentType, SVGProps } from "react";

import { Apple } from "@/components/ui/svgs/apple";
import { Bootstrap } from "@/components/ui/svgs/bootstrap";
import { Chakraui } from "@/components/ui/svgs/chakraui";
import { Cloudflare } from "@/components/ui/svgs/cloudflare";
import { Css } from "@/components/ui/svgs/css";
import { Expo } from "@/components/ui/svgs/expo";
import { Express } from "@/components/ui/svgs/express";
import { Fastify } from "@/components/ui/svgs/fastify";
import { Git } from "@/components/ui/svgs/git";
import { Github } from "@/components/ui/svgs/github";
import { Githubactions } from "@/components/ui/svgs/githubactions";
import { Googleanalytics } from "@/components/ui/svgs/googleanalytics";
import { Html5 } from "@/components/ui/svgs/html5";
import { Javascript } from "@/components/ui/svgs/javascript";
import { Jsonwebtokens } from "@/components/ui/svgs/jsonwebtokens";
import { Meta } from "@/components/ui/svgs/meta";
import { Modelcontextprotocol } from "@/components/ui/svgs/modelcontextprotocol";
import { Mongodb } from "@/components/ui/svgs/mongodb";
import { Jquery } from "@/components/ui/svgs/jquery";
import { Langchain } from "@/components/ui/svgs/langchain";
import { Mongoose } from "@/components/ui/svgs/mongoose";
import { Mysql } from "@/components/ui/svgs/mysql";
import { Nextdotjs } from "@/components/ui/svgs/nextdotjs";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Npm } from "@/components/ui/svgs/npm";
import { Php } from "@/components/ui/svgs/php";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Posthog } from "@/components/ui/svgs/posthog";
import { Postman } from "@/components/ui/svgs/postman";
import { Prisma } from "@/components/ui/svgs/prisma";
import { Razorpay } from "@/components/ui/svgs/razorpay";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Redis } from "@/components/ui/svgs/redis";
import { Redux } from "@/components/ui/svgs/redux";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Vite } from "@/components/ui/svgs/vite";
import { Wordpress } from "@/components/ui/svgs/wordpress";

/**
 * Optional logos for the skill chips, keyed by the exact string used in
 * DATA.skills. A skill with no entry here simply renders as a text chip, so
 * adding a skill never requires touching this file.
 */
export const SKILL_ICONS: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  React: ReactLight,
  "React Native": ReactLight,
  "Next.js": Nextdotjs,
  Expo: Expo,
  TypeScript: Typescript,
  JavaScript: Javascript,
  "Tailwind CSS": Tailwindcss,
  "Chakra UI": Chakraui,
  Redux: Redux,
  HTML5: Html5,
  CSS3: Css,
  Bootstrap: Bootstrap,
  "Node.js": Nodejs,
  Fastify: Fastify,
  Express: Express,
  Prisma: Prisma,
  PHP: Php,
  PostgreSQL: Postgresql,
  MySQL: Mysql,
  MongoDB: Mongodb,
  Redis: Redis,
  Supabase: Supabase,
  Cloudflare: Cloudflare,
  Git: Git,
  GitHub: Github,
  "CI/CD": Githubactions,
  JWT: Jsonwebtokens,
  "Sign in with Apple": Apple,
  "Expo EAS": Expo,
  LangChain: Langchain,
  MCP: Modelcontextprotocol,
  PostHog: Posthog,
  GA4: Googleanalytics,
  "Meta Pixel": Meta,
  "Meta Conversions API": Meta,
  Razorpay: Razorpay,
  Postman: Postman,
  WordPress: Wordpress,

  // Project tech that maps onto an existing mark. Adding an alias here is what
  // puts a tile in a project card's icon stack.
  "React Server Components": ReactLight,
  "React Virtualized": ReactLight,
  "Expo Router": Expo,
  EAS: Expo,
  NativeWind: Tailwindcss,
  Mongoose: Mongoose,
  npm: Npm,
  Vite: Vite,
  jQuery: Jquery,
};
