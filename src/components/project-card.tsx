/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { SKILL_ICONS } from "@/data/skill-icons";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";

const INLINE_MARKDOWN = {
  p: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
};

function ProjectMedia({
  image,
  video,
  alt,
}: {
  image?: string;
  video?: string;
  alt: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (video) {
    return (
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="h-44 w-full rounded-lg border object-cover"
      />
    );
  }
  if (!image || imageError) return null;
  return (
    <img
      src={image}
      alt={alt}
      className="h-44 w-full rounded-lg border object-cover"
      onError={() => setImageError(true)}
    />
  );
}

const STACK_LIMIT = 5;

/**
 * Overlapping logo tiles, the way a shared-with avatar stack reads. Anything
 * without a mark in SKILL_ICONS rolls into the +N counter rather than being
 * dropped, so the number always accounts for every technology on the card.
 */
function TechStack({ tags }: { tags: readonly string[] }) {
  // Several tags share a mark ("React Native" and "React Server Components"
  // both resolve to the React logo), so dedupe by icon or the stack repeats
  // itself. Deduped tags fall through to the +N counter.
  const seen = new Set<unknown>();
  const withIcons: { name: string; Icon: (typeof SKILL_ICONS)[string] }[] = [];
  for (const name of tags) {
    const Icon = SKILL_ICONS[name];
    if (!Icon || seen.has(Icon)) continue;
    seen.add(Icon);
    withIcons.push({ name, Icon });
  }
  const shown = withIcons.slice(0, STACK_LIMIT);
  const extra = tags.length - shown.length;

  if (!shown.length && !extra) return null;

  return (
    <div className="flex items-center">
      {shown.map(({ name, Icon }, index) => (
        <span
          key={name}
          title={name}
          style={{ zIndex: shown.length - index }}
          className="relative -ml-2 flex size-7 items-center justify-center rounded-full border border-border bg-white shadow-sm first:ml-0"
        >
          <Icon className="size-3.5" />
        </span>
      ))}
      {extra > 0 && (
        <span className="relative -ml-2 flex h-7 items-center rounded-full border border-border bg-muted px-2 text-[10px] font-medium tabular-nums text-muted-foreground">
          +{extra}
        </span>
      )}
    </div>
  );
}

function TechTags({ tags }: { tags: readonly string[] }) {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="h-6 w-fit border-border px-2 text-[11px] font-medium"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

interface Props {
  title: string;
  context?: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  context,
  href,
  description,
  dates,
  tags,
  image,
  video,
  links,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const hasMedia = Boolean(image || video);

  return (
    <>
      <div
        className={cn(
          "group relative flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm",
          className
        )}
      >
        {/* Stretched hit area: the whole card opens the detail modal. Rendered
            first so the links below sit above it. */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute inset-0 z-0 cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="sr-only">Read more about {title}</span>
        </button>

        {hasMedia && <ProjectMedia image={image} video={video} alt={title} />}

        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold leading-snug">{title}</h3>
              {context && (
                <Badge
                  variant="secondary"
                  className="h-5 px-1.5 text-[10px] font-medium"
                >
                  {context}
                </Badge>
              )}
            </div>
            {dates && (
              <time className="text-xs text-muted-foreground">{dates}</time>
            )}
          </div>

          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title}`}
              className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
        </div>

        <div className="line-clamp-3 text-xs leading-relaxed text-pretty text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">
          <Markdown components={INLINE_MARKDOWN}>{description}</Markdown>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <TechStack tags={tags} />
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-foreground">
            Read more
            <ArrowRight
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="flex flex-col gap-2 pr-8">
            <div className="flex flex-wrap items-center gap-2">
              <DialogTitle>{title}</DialogTitle>
              {context && (
                <Badge
                  variant="secondary"
                  className="h-5 px-1.5 text-[10px] font-medium"
                >
                  {context}
                </Badge>
              )}
            </div>
            {dates && (
              <time className="text-xs text-muted-foreground">{dates}</time>
            )}
          </div>

          {hasMedia && <ProjectMedia image={image} video={video} alt={title} />}

          <div className="text-sm leading-relaxed text-pretty text-muted-foreground [&_strong]:font-medium [&_strong]:text-foreground">
            <Markdown components={INLINE_MARKDOWN}>{description}</Markdown>
          </div>

          <TechTags tags={tags} />

          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {link.icon}
                  {link.type}
                  <ArrowUpRight className="size-3 text-muted-foreground" aria-hidden />
                </a>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
