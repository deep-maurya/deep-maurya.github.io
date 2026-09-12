/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";

import { HighlightList } from "@/components/section/highlight-list";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

/**
 * The config keeps readable month names ("April 2025"); the page prints the
 * abbreviated form LinkedIn uses. Formatting here rather than in the data
 * means the source stays legible and the display stays consistent.
 */
const MONTH_YEAR = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
});

function shortDate(value: string): string {
  if (!value) return value;
  if (value.toLowerCase() === "present") return "Present";
  const parsed = new Date(`${value} 1`);
  return Number.isNaN(parsed.getTime()) ? value : MONTH_YEAR.format(parsed);
}

function dateRange(start: string, end: string): string {
  return [shortDate(start), shortDate(end)].filter(Boolean).join(" - ");
}

function joinMeta(...parts: (string | null | undefined)[]) {
  return parts.filter(Boolean).join(" · ");
}

function Logo({ src, alt }: { src: string; alt: string }) {
  if (!src) {
    return (
      <div className="size-12 shrink-0 rounded-lg border bg-muted ring-1 ring-border/50" />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="size-12 shrink-0 rounded-lg border bg-white object-contain p-1.5 ring-1 ring-border/50"
    />
  );
}

function LinkPreview({
  link,
  fallbackImage,
}: {
  link: {
    title: string;
    href: string;
    image?: string;
    background?: string;
  };
  fallbackImage?: string;
}) {
  const image = link.image || fallbackImage;
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center gap-3 rounded-lg border bg-card p-2 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div
        className="relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border"
        style={link.background ? { backgroundColor: link.background } : undefined}
      >
        {image && (
          <img src={image} alt="" className="max-h-7 max-w-12 object-contain" />
        )}
        <span className="absolute bottom-1 right-1 flex size-5 items-center justify-center rounded-full bg-foreground/85 text-background">
          <ArrowUpRight className="size-3" aria-hidden />
        </span>
      </div>
      <span className="text-pretty text-sm font-medium leading-snug text-foreground">
        {link.title}
      </span>
    </a>
  );
}

export default function WorkSection() {
  return (
    <div className="flex flex-col gap-8">
      {DATA.work.map((work) => {
        const multiRole = (work.roles?.length ?? 0) > 1;

        return (
          <article key={work.company} className="flex gap-3">
            <Logo src={work.logoUrl} alt={work.company} />

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold leading-snug">
                  {multiRole ? work.company : work.title}
                </h3>
                {!multiRole && (
                  <span className="shrink-0 pt-0.5 text-xs tabular-nums text-muted-foreground">
                    {dateRange(work.start, work.end)}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {multiRole
                  ? work.employmentType
                  : joinMeta(work.company, work.employmentType)}
              </p>

              {work.location && (
                <p className="text-sm text-muted-foreground">{work.location}</p>
              )}

              <div className="mt-2 flex flex-col gap-4 text-xs text-muted-foreground sm:text-sm">
                {work.description && <p>{work.description}</p>}
                {work.highlights.length > 0 && (
                  <HighlightList items={work.highlights} />
                )}

                {work.roles && work.roles.length > 0 && (
                  <div
                    className={cn(
                      "flex flex-col gap-5",
                      multiRole && "border-l border-border pl-5"
                    )}
                  >
                    {work.roles.map((role) => (
                      <div
                        key={role.title}
                        className="relative flex flex-col gap-2"
                      >
                        {multiRole && (
                          <>
                            <span
                              aria-hidden
                              className="absolute -left-6 top-1.5 size-2 rounded-full bg-border ring-4 ring-background"
                            />
                            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                              <span className="font-semibold text-foreground">
                                {role.title}
                              </span>
                              <span className="shrink-0 text-xs tabular-nums">
                                {dateRange(role.start, role.end)}
                              </span>
                            </div>
                          </>
                        )}
                        {role.highlights && role.highlights.length > 0 && (
                          <HighlightList items={role.highlights} />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {work.links && work.links.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {work.links.map((link) => (
                      <LinkPreview
                        key={link.href}
                        link={link}
                        fallbackImage={work.logoUrl}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
