// Regenerates the social card at src/app/opengraph-image.png.
// Run `npm run og` after changing your name or description in src/data/resume.tsx.
//
// This is a one-off script rather than an app/opengraph-image.tsx route because
// that route emits an extensionless file, which GitHub Pages serves as
// application/octet-stream and social crawlers then reject.
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { createElement as h } from "react";

// next/og has no ESM entry; reach it through CJS resolution.
const require = createRequire(import.meta.url);
const { ImageResponse } = require("next/og");

const root = process.cwd();
const fontDir = join(root, "assets", "fonts");
const outFile = join(root, "src", "app", "opengraph-image.png");

// Read the two fields we need straight out of resume.tsx so this script does
// not need a TypeScript loader.
const resume = await readFile(join(root, "src", "data", "resume.tsx"), "utf8");
const field = (key) => {
  const match = resume.match(new RegExp(`\\n  ${key}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  if (!match) throw new Error(`Could not read "${key}" from src/data/resume.tsx`);
  return match[1].replace(/\\"/g, '"');
};

const name = field("name");
const initials = field("initials");
const description = field("description");

const [cabinetGrotesk, clashDisplay] = await Promise.all([
  readFile(join(fontDir, "CabinetGrotesk-Medium.ttf")),
  readFile(join(fontDir, "ClashDisplay-Semibold.ttf")),
]);

const styles = {
  outer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "40px",
  },
  card: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#fafafa",
    position: "relative",
    padding: "40px",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
  },
  avatar: {
    position: "absolute",
    top: "40px",
    left: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "140px",
    height: "140px",
    borderRadius: "24px",
    border: "4px solid #e5e5e5",
    backgroundColor: "#ffffff",
    fontFamily: "Clash Display",
    fontSize: "56px",
    color: "#171717",
  },
  title: {
    fontFamily: "Clash Display",
    fontSize: "56px",
    lineHeight: "1.1",
    color: "#000000",
    marginBottom: "16px",
    letterSpacing: "-0.02em",
    maxWidth: "900px",
  },
  description: {
    fontSize: "24px",
    lineHeight: "1.5",
    color: "#404040",
    maxWidth: "800px",
  },
};

const response = new ImageResponse(
  h("div", { style: styles.outer },
    h("div", { style: styles.card },
      h("div", { style: styles.avatar }, initials),
      h("div", { style: styles.title }, name),
      h("div", { style: styles.description }, description)
    )
  ),
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Cabinet Grotesk", data: cabinetGrotesk, weight: 400, style: "normal" },
      { name: "Clash Display", data: clashDisplay, weight: 600, style: "normal" },
    ],
  }
);

await writeFile(outFile, Buffer.from(await response.arrayBuffer()));
console.log(`wrote ${outFile}`);
