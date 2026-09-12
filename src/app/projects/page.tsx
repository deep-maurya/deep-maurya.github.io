import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { groupProjectsByKind } from "@/lib/projects";

const BLUR_FADE_DELAY = 0.04;

export const metadata: Metadata = {
  title: "Projects",
  description: `Everything ${DATA.name} has built: products, client sites and published packages.`,
};

export default function ProjectsPage() {
  const groups = groupProjectsByKind();

  return (
    <main className="flex min-h-dvh flex-col gap-10">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back
        </Link>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl">
            Projects
          </h1>
          <p className="text-muted-foreground text-pretty">
            Everything in one place: what I build at Precize, client work from
            the freelance years, and packages published along the way.
          </p>
        </div>
      </BlurFade>

      {groups.map((group, groupIndex) => (
        <BlurFade
          key={group.kind}
          delay={BLUR_FADE_DELAY * (3 + groupIndex)}
        >
          <section className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                {group.kind}
              </h2>
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
                {group.projects.length}
              </span>
            </div>
            <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
              {group.projects.map((project) => (
                <ProjectCard
                  key={project.title}
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
              ))}
            </div>
          </section>
        </BlurFade>
      ))}
    </main>
  );
}
