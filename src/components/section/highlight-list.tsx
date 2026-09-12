"use client";

import { useState } from "react";
import Markdown from "react-markdown";

const INLINE_MARKDOWN = { p: ({ children }: { children?: React.ReactNode }) => <>{children}</> };

/**
 * Bullets are markdown so the config can emphasise a metric or a system name
 * with **. Bold renders in the foreground colour against muted body text,
 * which is what makes the numbers findable in a scan.
 *
 * Collapsed, the bullets run together as one block clamped to two lines, the
 * way LinkedIn truncates a description. Expanded, they become a real list.
 */
export function HighlightList({ items }: { items: readonly string[] }) {
  const [expanded, setExpanded] = useState(false);

  const toggle = (
    <button
      type="button"
      onClick={() => setExpanded((value) => !value)}
      className="w-fit cursor-pointer text-sm font-semibold text-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
    >
      {expanded ? "show less" : "…show more"}
    </button>
  );

  if (!expanded) {
    return (
      <div className="flex flex-col gap-1">
        <p className="line-clamp-2 leading-relaxed text-pretty [&_strong]:font-medium [&_strong]:text-foreground">
          {items.map((item, index) => (
            <span key={item}>
              {index > 0 && " "}
              <span aria-hidden className="text-muted-foreground/50">
                &bull;{" "}
              </span>
              <Markdown components={INLINE_MARKDOWN}>{item}</Markdown>
            </span>
          ))}
        </p>
        {items.length > 0 && toggle}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-2 list-disc pl-5 marker:text-muted-foreground/40">
        {items.map((item) => (
          <li
            key={item}
            className="leading-relaxed text-pretty [&_strong]:font-medium [&_strong]:text-foreground"
          >
            <Markdown components={INLINE_MARKDOWN}>{item}</Markdown>
          </li>
        ))}
      </ul>
      {toggle}
    </div>
  );
}
