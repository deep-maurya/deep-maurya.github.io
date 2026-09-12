# deep-maurya.github.io

My portfolio, built with Next.js, Tailwind CSS, shadcn/ui and [Magic UI](https://magicui.design/).
Based on the [magicuidesign/portfolio](https://github.com/magicuidesign/portfolio) template.

## Editing content

Everything on the site comes from one file: [`src/data/resume.tsx`](src/data/resume.tsx).
The components render whatever is in those arrays, in order.

| To add | Do this |
| --- | --- |
| A job | Push an object onto `work`, newest first. Held two titles there? Add a `roles` array. Bullets go in `highlights`. |
| A project | Push an object onto `projects`. `links` controls the badges on the card. |
| A school | Push an object onto `education`. |
| A skill | Add a string to the right group's `items`. |
| A skill group | Push `{ category, items }` onto `skills`. |
| A hackathon | Push an object onto `hackathons`. The section is hidden while the array is empty. |
| A social link | Add an entry to `contact.social`. `navbar: true` puts it in the bottom dock. |

Every array is typed, so your editor will tell you which fields an entry needs.
Search the file for `TODO(deepak)` to find whatever is still waiting on real content.

Images go in `public/`, which is the only folder served to visitors, and are
referenced by path. Logos are filed by category:

```
public/
  me.png                          avatarUrl: "/me.png"
  logos/work/precize.png          logoUrl:   "/logos/work/precize.png"
  logos/education/masai.png       logoUrl:   "/logos/education/masai.png"
  logos/hackathons/nobroker.png   image:     "/logos/hackathons/nobroker.png"
```

Leave the string empty and a neutral placeholder renders instead. Logo circles
sit on a white plate, because several brand marks are dark line art on a
transparent background and would otherwise vanish in dark mode.

Skill logos are optional and live in [`src/data/skill-icons.tsx`](src/data/skill-icons.tsx),
keyed by the exact skill string. A skill with no entry there renders as a plain
text chip, so adding a skill never requires touching that file.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run lint
npm run og       # regenerate the social card after changing name or description
```

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which runs `next build` (configured with `output: "export"`) and publishes `out/`
to GitHub Pages.

This requires **Settings → Pages → Source** to be set to **GitHub Actions**, not
"Deploy from a branch".

## Notes

- `assets/fonts/` holds the two display fonts used only to render the social
  card at build time. They sit outside `public/` so they are not shipped to
  visitors.
- The Work accordion opens the first entry by default. Radix does not render
  closed accordion content at all, so this keeps the current role's bullets in
  the HTML for crawlers.
