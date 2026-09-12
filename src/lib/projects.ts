import { DATA } from "@/data/resume";

type Project = (typeof DATA)["projects"][number];

/**
 * Groups projects by their `kind`, in the order each kind first appears in
 * the config. Adding a new kind string to a project creates a new group with
 * no other change.
 */
export function groupProjectsByKind(): { kind: string; projects: Project[] }[] {
  const groups: { kind: string; projects: Project[] }[] = [];
  for (const project of DATA.projects) {
    const existing = groups.find((group) => group.kind === project.kind);
    if (existing) {
      existing.projects.push(project);
    } else {
      groups.push({ kind: project.kind, projects: [project] });
    }
  }
  return groups;
}
