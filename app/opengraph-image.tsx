import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Text only: the logo is being redesigned, so no mark here yet
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BLUE = "#1f4fb5";
const WHITE = "#ffffff";

const headline = site.tagline;
const strap = `School supplies division of ${site.parent}, Hyderabad`;

/** Fetch a Google Font as TTF, subset to the text used. Falls back to the built-in font. */
async function loadFont(family: string, axes: string, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:${axes}&text=${encodeURIComponent(text)}`,
      { headers: { "User-Agent": "Mozilla/4.0" } },
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [serif, sans] = await Promise.all([
    loadFont("Source+Serif+4", "opsz,wght@60,600", `${site.name}${headline}`),
    loadFont("Public+Sans", "wght@500", `${strap}${site.domain}`),
  ]);

  const fonts = [
    ...(serif ? [{ name: "Serif", data: serif, weight: 600 as const, style: "normal" as const }] : []),
    ...(sans ? [{ name: "Sans", data: sans, weight: 500 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BLUE,
          color: WHITE,
          padding: "72px 80px",
          fontFamily: sans ? "Sans" : undefined,
        }}
      >
        <div style={{ display: "flex", fontFamily: serif ? "Serif" : undefined, fontSize: 44, fontWeight: 600 }}>
          {site.name}
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: serif ? "Serif" : undefined,
            fontSize: 84,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: "-0.015em",
            maxWidth: 940,
          }}
        >
          {headline}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid rgba(255,255,255,0.35)",
            paddingTop: 28,
            fontSize: 28,
          }}
        >
          <span style={{ opacity: 0.85 }}>{strap}</span>
          <span>{site.domain}</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
