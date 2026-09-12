import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCarousel } from "@/components/project-carousel";
import { groupProjectsByKind } from "@/lib/projects";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
  const groups = groupProjectsByKind();

  return (
    <section id="projects">
      <div className="flex min-h-0 flex-col gap-y-8">
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">
                My Projects
              </span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Check out my latest work
            </h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              What I build at Precize, a published npm package, and client work
              from the freelance years.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-y-8">
          {groups.map((group, index) => (
            <BlurFade
              key={group.kind}
              delay={BLUR_FADE_DELAY * 12 + index * 0.05}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {group.kind}
                  </h3>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
                    {group.projects.length}
                  </span>
                </div>
                <ProjectCarousel projects={group.projects} />
              </div>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <Link
            href="/projects"
            className="mx-auto flex w-fit items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            View all projects
            <ArrowUpRight className="size-4 text-muted-foreground" aria-hidden />
          </Link>
        </BlurFade>
      </div>
    </section>
  );
}
