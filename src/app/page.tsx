import Link from "next/link";
import { fontsFor } from "@/design/fonts";
import { expedition, pixel, swiss, themeVars, type Theme } from "@/design/themes";

// The hub: links to the three mood boards, the three design systems, and
// the site. Styled in the Swiss system the site uses.

const styles: { theme: Theme; board: string[] }[] = [
  { theme: swiss, board: ["#111111", "#e9e9e6", "#e30613"] },
  { theme: pixel, board: ["#1d1b3a", "#ff004d", "#29adff"] },
  { theme: expedition, board: ["#14213d", "#d8c9a7", "#e4572e"] },
];

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-[var(--c-text)] py-10 md:grid-cols-12 md:gap-8">
      <h2 className="ui-label md:col-span-3">
        {n} · {title}
      </h2>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

function Swatch({ color }: { color: string }) {
  return <span className="h-10 flex-1 border border-[var(--c-text)]" style={{ background: color }} />;
}

export default function Hub() {
  return (
    <div
      className={`ui-root min-h-full flex-1 ${fontsFor.swiss} ${fontsFor.pixel} ${fontsFor.expedition}`}
      style={themeVars(swiss)}
    >
      <main className="mx-auto max-w-6xl px-5 py-16 sm:px-10 sm:py-24">
        <p className="ui-label">UI/UX &amp; Visual Design · MPCS 51238</p>
        <h1 className="ui-display mt-4">Ken Piech</h1>
        <p className="ui-heading ui-muted mt-2">Portfolio, and how it was designed</p>

        <div className="mt-16">
          <Step n={1} title="Mood boards">
            <div className="grid gap-4 sm:grid-cols-3">
              {styles.map(({ theme, board }) => (
                <Link key={theme.slug} href={`/mood-boards/${theme.slug}`} className="ui-card ui-focusable">
                  <span className="flex gap-1">
                    {board.map((c) => (
                      <Swatch key={c} color={c} />
                    ))}
                  </span>
                  <span className="mt-4 flex items-baseline justify-between gap-2">
                    <span className="ui-heading">{theme.name}</span>
                    <span aria-hidden>→</span>
                  </span>
                  <span className="ui-label ui-muted mt-2 block">{theme.tagline}</span>
                </Link>
              ))}
            </div>
          </Step>

          <Step n={2} title="Design systems">
            <div className="grid gap-4 sm:grid-cols-3">
              {styles.map(({ theme }) => (
                <Link key={theme.slug} href={`/design-systems/${theme.slug}`} className="ui-card ui-focusable">
                  <span
                    className="flex h-24 items-center justify-between px-4"
                    style={{ background: theme.colors.background, border: `1px solid ${theme.colors.text}` }}
                  >
                    <span
                      className="text-4xl leading-none"
                      style={{ fontFamily: theme.type.display.font, fontWeight: theme.type.display.weight, color: theme.colors.text }}
                    >
                      Aa
                    </span>
                    <span className="flex gap-1.5">
                      {[theme.colors.text, theme.colors.muted, theme.colors.accent].map((c) => (
                        <span
                          key={c}
                          className="h-4 w-4 rounded-full"
                          style={{ background: c, border: `1px solid ${theme.colors.text}` }}
                        />
                      ))}
                    </span>
                  </span>
                  <span className="mt-4 flex items-baseline justify-between gap-2">
                    <span className="ui-heading">{theme.name}</span>
                    <span aria-hidden>→</span>
                  </span>
                  <span className="ui-label ui-muted mt-2 block">Built from its mood board</span>
                </Link>
              ))}
            </div>
          </Step>

          <Step n={3} title="The site">
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/portfolio" className="ui-btn ui-btn--primary ui-focusable">
                Open portfolio →
              </Link>
              <p className="ui-body ui-muted">Built in the Swiss design system.</p>
            </div>
          </Step>
        </div>

        <footer className="flex flex-wrap justify-between gap-4 border-t border-[var(--c-text)] pt-6">
          <a className="ui-link ui-focusable" href="https://github.com/kenpiech/portfolio">
            Source on GitHub
          </a>
          <p className="ui-label ui-muted">2026</p>
        </footer>
      </main>
    </div>
  );
}
