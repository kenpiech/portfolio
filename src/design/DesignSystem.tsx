"use client";

import { useState } from "react";
import { categories, projects } from "@/content/projects";
import { contrast, themeVars, type Theme } from "./themes";
import {
  Badge,
  Button,
  Checkbox,
  Chip,
  Modal,
  ProjectCard,
  ProjectDetail,
  ProjectRow,
  Select,
  Tabs,
  TextInput,
  TextLink,
  Toggle,
} from "./ui";

const FONT_NAMES: Record<string, string> = {
  '"Helvetica Neue", Helvetica, Arial, sans-serif': "Helvetica",
  "var(--font-press-start)": "Press Start 2P",
  "var(--font-vt323)": "VT323",
  "var(--font-libre-caslon)": "Libre Caslon Text",
  "var(--font-plex-sans)": "IBM Plex Sans",
  "var(--font-plex-mono)": "IBM Plex Mono",
};

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t pt-6" style={{ borderColor: "var(--c-border)", borderTopWidth: "var(--bw)" }}>
      <h2 className="ui-label mb-6">
        {n} · {title}
      </h2>
      {children}
    </section>
  );
}

function Demo({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="ui-label ui-muted mb-3">{name}</p>
      {children}
    </div>
  );
}

function Ratio({ fg, bg }: { fg: string; bg: string }) {
  const r = contrast(fg, bg);
  return (
    <span className="ui-label">
      {r.toFixed(1)}:1 {r >= 4.5 ? "AA" : r >= 3 ? "AA large" : "fail"}
    </span>
  );
}

export function DesignSystem({ theme, fontClasses }: { theme: Theme; fontClasses: string }) {
  const c = theme.colors;
  const [filter, setFilter] = useState("All");
  const [tab, setTab] = useState("Work");
  const [open, setOpen] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const opened = projects.find((p) => p.slug === open);

  const roles = [
    { name: "Background", color: c.background, ratio: null },
    { name: "Surface", color: c.surface, ratio: null },
    { name: "Text", color: c.text, ratio: [c.text, c.background] },
    { name: "Muted", color: c.muted, ratio: [c.muted, c.background] },
    { name: "Border", color: c.border, ratio: null },
    { name: "Accent", color: c.accent, ratio: [c.accentText, c.accent] },
  ] as const;

  const support = [
    ["Hover", c.hover],
    ["Focus", c.focus],
    ["Danger", c.danger],
    ["Success", c.success],
    ["Disabled", c.disabledBg],
  ];

  const typeRoles = [
    { role: "Display", spec: theme.type.display, el: <p className="ui-display">Ken Piech</p> },
    { role: "Heading", spec: theme.type.heading, el: <p className="ui-heading">Selected work</p> },
    {
      role: "Body",
      spec: theme.type.body,
      el: (
        <p className="ui-body max-w-prose">
          I investigate technical threats at Meta and build distributed systems at the University
          of Chicago.
        </p>
      ),
    },
    { role: "Label", spec: theme.type.label, el: <p className="ui-label">Systems · Security</p> },
  ];

  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter as never));

  return (
    <main className={`ui-root min-h-full flex-1 ${fontClasses}`} style={themeVars(theme)}>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-10 sm:py-20">
        <header className="mb-14">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <TextLink href="/">← Hub</TextLink>
            <TextLink href={`/mood-boards/${theme.slug}`}>Mood board</TextLink>
          </div>
          <h1 className="ui-display mt-6">{theme.name}</h1>
          <p className="ui-heading ui-muted mt-2">Design System</p>
          <p className="ui-label mt-4">{theme.tagline}</p>
        </header>

        <div className="grid gap-16">
          <Section n={1} title="Color roles">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {roles.map((r) => (
                <div key={r.name}>
                  <div
                    className="aspect-[4/3]"
                    style={{
                      background: r.color,
                      border: `var(--bw) solid ${c.text}`,
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <p className="ui-body mt-2">{r.name}</p>
                  <p className="ui-label ui-muted">{r.color}</p>
                  {r.ratio && <Ratio fg={r.ratio[0]} bg={r.ratio[1]} />}
                </div>
              ))}
            </div>
            <p className="ui-body ui-muted mt-6">
              Contrast: text and muted against the background; accent text against the accent.
              The accent is kept for the primary action.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {support.map(([name, color]) => (
                <span key={name} className="flex items-center gap-2">
                  <span
                    className="inline-block h-5 w-5"
                    style={{ background: color, border: `1px solid ${c.text}`, borderRadius: "var(--radius)" }}
                  />
                  <span className="ui-label">{name}</span>
                </span>
              ))}
            </div>
          </Section>

          <Section n={2} title="Type roles">
            <div className="grid gap-8">
              {typeRoles.map((t) => (
                <div key={t.role} className="grid gap-2 sm:grid-cols-[1fr_280px] sm:items-baseline sm:gap-8">
                  {t.el}
                  <p className="ui-label ui-muted sm:text-right">
                    {t.role} · {FONT_NAMES[t.spec.font]} · {t.spec.size}px / {t.spec.weight}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section n={3} title="Spacing and shape">
            <div className="grid gap-10 lg:grid-cols-2">
              <Demo name="Spacing scale (px)">
                <div className="flex items-end gap-3">
                  {theme.spacing.map((s) => (
                    <div key={s} className="text-center">
                      <div style={{ width: s, height: s, background: c.text }} />
                      <p className="ui-label mt-2">{s}</p>
                    </div>
                  ))}
                </div>
              </Demo>
              <Demo name="Corners · border · shadow">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="ui-panel h-16 w-16 p-0" />
                  <span className="ui-chip pointer-events-none flex items-center">Chip</span>
                  <Button>Shadow</Button>
                </div>
                <p className="ui-body ui-muted mt-4">{theme.shape.note}</p>
              </Demo>
            </div>
          </Section>

          <Section n={4} title="Components">
            <div className="grid gap-10">
              <Demo name="Navigation">
                <nav
                  className="flex flex-wrap items-center justify-between gap-4 pb-4"
                  style={{ borderBottom: `var(--bw) solid var(--c-border)` }}
                >
                  <span className="ui-heading">Ken Piech</span>
                  <span className="flex flex-wrap items-center gap-6">
                    <TextLink href="#">Work</TextLink>
                    <TextLink href="#">About</TextLink>
                    <Button>Get in touch</Button>
                  </span>
                </nav>
              </Demo>

              <div className="grid gap-10 md:grid-cols-2">
                <Demo name="Buttons and link">
                  <div className="flex flex-wrap items-center gap-4">
                    <Button>Get in touch</Button>
                    <Button variant="secondary">Resume</Button>
                    <TextLink href="#">See all projects →</TextLink>
                  </div>
                </Demo>
                <Demo name="Tabs">
                  <Tabs tabs={["Work", "About", "Contact"]} value={tab} onChange={setTab} label="Sections" />
                </Demo>
                <Demo name="Text input and select">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextInput label="Search" placeholder="Search projects" />
                    <Select label="Sort" options={["Newest", "Oldest", "A–Z"]} />
                  </div>
                </Demo>
                <Demo name="Checkbox, radio, toggle">
                  <div className="grid gap-3">
                    <Checkbox label="Include coursework" defaultChecked />
                    <div className="flex flex-wrap gap-6">
                      <Checkbox type="radio" name={`view-${theme.slug}`} label="Cards" defaultChecked />
                      <Checkbox type="radio" name={`view-${theme.slug}`} label="List" />
                    </div>
                    <Toggle label="Show private work" defaultOn />
                  </div>
                </Demo>
              </div>

              <Demo name="Filter chips">
                <div className="flex flex-wrap gap-2">
                  {["All", ...categories].map((f) => (
                    <Chip key={f} selected={f === filter} onClick={() => setFilter(f)}>
                      {f}
                    </Chip>
                  ))}
                </div>
              </Demo>

              <div className="grid gap-10 md:grid-cols-2">
                <Demo name="Card (click to open)">
                  {shown[0] ? (
                    <ProjectCard project={shown[0]} onOpen={() => setOpen(shown[0].slug)} />
                  ) : (
                    <p className="ui-body ui-muted">No projects in this category.</p>
                  )}
                </Demo>
                <Demo name="List rows (click to open)">
                  <div>
                    {shown.map((p) => (
                      <ProjectRow key={p.slug} project={p} onOpen={() => setOpen(p.slug)} />
                    ))}
                  </div>
                </Demo>
                <Demo name="Badges">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Public</Badge>
                    <Badge>Private</Badge>
                    <Badge>Team</Badge>
                    <Badge>Research</Badge>
                  </div>
                </Demo>
                <Demo name="Detail panel">
                  {panelOpen ? (
                    <ProjectDetail project={projects[1]} onClose={() => setPanelOpen(false)} />
                  ) : (
                    <Button variant="secondary" onClick={() => setPanelOpen(true)}>
                      Reopen panel
                    </Button>
                  )}
                </Demo>
              </div>
            </div>
          </Section>

          <Section n={5} title="Control states">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-separate border-spacing-x-3 border-spacing-y-4">
                <thead>
                  <tr>
                    <th />
                    {["Rest", "Hover", "Focus", "Pressed", "Selected", "Disabled"].map((s) => (
                      <th key={s} className="ui-label ui-muted text-left font-normal">
                        {s}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="ui-label text-left">Primary</th>
                    <td><Button>Send</Button></td>
                    <td><Button force="hover">Send</Button></td>
                    <td><Button force="focus">Send</Button></td>
                    <td><Button force="pressed">Send</Button></td>
                    <td><Button selected>✓ Sent</Button></td>
                    <td><Button disabled>Send</Button></td>
                  </tr>
                  <tr>
                    <th className="ui-label text-left">Secondary</th>
                    <td><Button variant="secondary">Resume</Button></td>
                    <td><Button variant="secondary" force="hover">Resume</Button></td>
                    <td><Button variant="secondary" force="focus">Resume</Button></td>
                    <td><Button variant="secondary" force="pressed">Resume</Button></td>
                    <td><Button variant="secondary" selected>✓ Saved</Button></td>
                    <td><Button variant="secondary" disabled>Resume</Button></td>
                  </tr>
                  <tr>
                    <th className="ui-label text-left">Chip</th>
                    <td><Chip>Systems</Chip></td>
                    <td><Chip force="hover">Systems</Chip></td>
                    <td><Chip force="focus">Systems</Chip></td>
                    <td><Chip force="pressed">Systems</Chip></td>
                    <td><Chip selected>Systems</Chip></td>
                    <td><Chip disabled>Systems</Chip></td>
                  </tr>
                  <tr>
                    <th className="ui-label text-left">Input</th>
                    <td><input className="ui-input ui-focusable" placeholder="Search" aria-label="Rest" /></td>
                    <td><input className="ui-input ui-focusable" data-force="hover" placeholder="Search" aria-label="Hover" /></td>
                    <td><input className="ui-input ui-focusable" data-force="focus" placeholder="Search" aria-label="Focus" /></td>
                    <td className="ui-label ui-muted">—</td>
                    <td className="ui-label ui-muted">—</td>
                    <td><input className="ui-input" disabled placeholder="Search" aria-label="Disabled" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section n={6} title="UI states">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="ui-panel grid min-h-40 place-content-center gap-3 text-center">
                <p className="ui-body">No projects match.</p>
                <TextLink href="#" onClick={(e) => { e.preventDefault(); setFilter("All"); }}>
                  Clear filters
                </TextLink>
                <p className="ui-label ui-muted">Empty</p>
              </div>
              <div className="ui-panel grid min-h-40 place-items-center content-center gap-3 text-center" role="status">
                <span className="ui-spinner" />
                <p className="ui-body">Loading projects…</p>
                <p className="ui-label ui-muted">Loading</p>
              </div>
              <div className="ui-panel grid min-h-40 place-items-center content-center gap-3 text-center" role="alert">
                <p className="ui-body ui-status-error">Couldn’t load projects.</p>
                <Button variant="secondary">Try again</Button>
                <p className="ui-label ui-muted">Error</p>
              </div>
              <div className="ui-panel grid min-h-40 place-content-center gap-3 text-center" role="status">
                <p className="ui-body ui-status-success">✓ Message sent</p>
                <p className="ui-body ui-muted">I’ll reply within a few days.</p>
                <p className="ui-label ui-muted">Success</p>
              </div>
            </div>
          </Section>
        </div>
      </div>

      <Modal open={!!opened} onClose={() => setOpen(null)} label={opened?.title ?? "Project"}>
        {opened && <ProjectDetail project={opened} onClose={() => setOpen(null)} />}
      </Modal>
    </main>
  );
}
