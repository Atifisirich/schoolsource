// Visual coding for the three category bands, shared by the header menu,
// the products page and category pages.

export const bandStyle: Record<string, { dot: string; tint: string; tintStrong: string; text: string; label: string }> = {
  everyday: {
    dot: "bg-pencil",
    tint: "bg-pencil-soft/45",
    tintStrong: "bg-pencil-soft",
    text: "text-ink",
    label: "Every term",
  },
  activities: {
    dot: "bg-rule",
    tint: "bg-rule/20",
    tintStrong: "bg-rule/45",
    text: "text-ink",
    label: "For occasions",
  },
  setup: {
    dot: "bg-board",
    tint: "bg-board/10",
    tintStrong: "bg-board/20",
    text: "text-board",
    label: "One-time setup",
  },
};

/** Minimal category data for client components (keeps item lists out of every page). */
export type NavCategory = {
  number: string;
  slug: string;
  name: string;
  band: string;
  itemCount: number;
};

export type NavBand = { id: string; number: string; name: string; note: string };
