# SchoolSource logo

The mark is one unbroken line, drawn as an S, starting from a single orange point. One source, one line of supply to the school. The wordmark is "SchoolSource" in Source Serif 4 SemiBold (600), in one colour.

## Files

| File | Use |
|---|---|
| `logo.svg` | Full colour, for white or very light backgrounds |
| `logo-reversed.svg` | Reversed, for the ink background (`#0f1b2d`), as in the site footer |
| `mark.svg` | The mark alone: favicons, avatars, stamps on documents |
| `logo.png` | 1200px wide on white, for email, WhatsApp and office documents |
| `explorations.png` | The routes we explored and why we chose this one |

In the site, use `<Logo />` and `<LogoMark />` from `components/layout/Logo.tsx` (`tone="paper"` on dark). The wordmark in the SVG files is outlined, so they need no font installed.

## Colours

| Name | Hex | Where |
|---|---|---|
| Board blue | `#1f4fb5` | The line, on white |
| Pencil orange | `#f5872a` | The source point only, on every background |
| Ink | `#0f1b2d` | Wordmark on white; background for the reversed logo |
| White | `#ffffff` | Line and wordmark on ink |

The mark never uses more than two colours. No gradients, shadows or outlines.

## Clear space

Keep clear space on every side equal to the diameter of the orange point (about one and a half times the line's thickness). Nothing else, including the page edge, goes inside it.

## Minimum size

- Full logo: 120px wide on screen, 30mm wide in print.
- Mark alone: 16px. Below 24px, use the mark without the wordmark.

## Do

- Use the supplied files; scale them proportionally.
- Use the full-colour logo on white and the reversed logo on ink.
- Use a single-colour version (all ink, or all white) for one-colour printing such as rubber stamps, fax and embossing.

## Don't

- Recolour the line orange, or the point blue.
- Colour "Source" differently from "School"; the wordmark is one colour.
- Put white text, or the reversed logo, on orange.
- Place the logo on photographs or mid-tone backgrounds where the line loses contrast.
- Stretch, rotate, outline, or add effects (gradients, shadows, glows).
- Rebuild the wordmark in another typeface or change its spacing.
- Join the orange point to the line or move it; the gap is part of the mark.
