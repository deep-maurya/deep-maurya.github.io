"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import type { DATA } from "@/data/resume";

type Project = (typeof DATA)["projects"][number];

/**
 * Two cards in view on desktop, one on mobile, with the rest a scroll away.
 *
 * Built on native scroll-snap rather than a carousel library: the track is a
 * real scroll container, so a trackpad swipe, a touch drag and the keyboard
 * all work without any of it being reimplemented.
 */
export function ProjectCarousel({ projects }: { projects: readonly Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // 1px of slack: fractional scroll widths never land exactly on the end.
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const page = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  const showNav = projects.length > 1;

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={trackRef}
        onScroll={sync}
        className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <div
            key={project.title}
            className="min-w-0 shrink-0 basis-full snap-start sm:basis-[calc(50%-0.375rem)]"
          >
            <ProjectCard
              title={project.title}
              context={project.context}
              href={project.href}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </div>
        ))}
      </div>

      {showNav && (
        <div className="flex justify-end gap-2">
          <NavButton
            label="Previous projects"
            onClick={() => page(-1)}
            disabled={atStart}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </NavButton>
          <NavButton
            label="More projects"
            onClick={() => page(1)}
            disabled={atEnd}
          >
            <ChevronRight className="size-4" aria-hidden />
          </NavButton>
        </div>
      )}
    </div>
  );
}

function NavButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95 disabled:cursor-default disabled:bg-muted disabled:text-muted-foreground/60 disabled:shadow-none disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {children}
    </button>
  );
}
