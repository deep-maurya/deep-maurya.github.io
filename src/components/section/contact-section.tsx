import { Mail, Phone } from "lucide-react";
import Link from "next/link";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { Icons } from "@/components/icons";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  // tel: links cannot carry the spaces the display format uses.
  const dialable = DATA.contact.tel.replace(/\s/g, "");

  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-5 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          Working on something interesting, or hiring? A call is the fastest way
          to reach me. Email works too, and I read everything.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href={`tel:${dialable}`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Phone className="size-4" aria-hidden />
            Call now
          </Link>
          <Link
            href={`mailto:${DATA.contact.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Mail className="size-4 text-muted-foreground" aria-hidden />
            Email
          </Link>
          <Link
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Icons.linkedin className="size-4" aria-hidden />
            LinkedIn
          </Link>
        </div>

        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <a
            href={`tel:${dialable}`}
            className="hover:text-foreground transition-colors"
          >
            {DATA.contact.tel}
          </a>
          <span aria-hidden className="text-muted-foreground/40">
            &middot;
          </span>
          <a
            href={`mailto:${DATA.contact.email}`}
            className="hover:text-foreground transition-colors"
          >
            {DATA.contact.email}
          </a>
        </p>
      </div>
    </div>
  );
}
