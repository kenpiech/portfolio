"use client";

import { useState } from "react";
import { categories, projects, type Project } from "@/content/projects";
import { swiss, themeVars } from "@/design/themes";
import { Badge, Button, Chip, Modal, TextInput, TextLink } from "@/design/ui";

// The portfolio, built from the Swiss design system. Two interactions:
// filter chips over the work, and a case-study sheet for each project.
// The contact form is a front-end demo: nothing is sent or stored.

const GRID = "grid grid-cols-1 gap-x-8 md:grid-cols-12";

function Nav({ onContact }: { onContact: () => void }) {
  const [menu, setMenu] = useState(false);
  return (
    <nav className="sticky top-0 z-10 border-b border-[var(--c-text)] bg-[var(--c-bg)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-10">
        <a href="#top" className="ui-heading ui-focusable">
          Ken Piech
        </a>
        <div className="hidden items-center gap-8 sm:flex">
          <TextLink href="#work">Work</TextLink>
          <TextLink href="#about">About</TextLink>
          <Button onClick={onContact}>Get in touch</Button>
        </div>
        <Button
          variant="secondary"
          className="sm:hidden"
          aria-expanded={menu}
          aria-controls="mobile-menu"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close" : "Menu"}
        </Button>
      </div>
      {menu && (
        <div id="mobile-menu" className="grid gap-4 border-t border-[var(--c-text)] px-5 py-5 sm:hidden">
          <TextLink href="#work" onClick={() => setMenu(false)}>
            Work
          </TextLink>
          <TextLink href="#about" onClick={() => setMenu(false)}>
            About
          </TextLink>
          <Button
            onClick={() => {
              setMenu(false);
              onContact();
            }}
          >
            Get in touch
          </Button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const facts = [
    ["Now", "Technical threat investigator at Meta"],
    ["Studying", "MS in Computer Science, University of Chicago"],
    ["Before", "Intelligence analyst. Submarine officer and nuclear engineer, U.S. Navy"],
  ];
  return (
    <header id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-10 sm:pt-24">
      <p className="ui-label">Portfolio · 2026</p>
      <h1 className="ui-display mt-4">Ken Piech</h1>
      <div className={`${GRID} mt-8`}>
        <p className="ui-heading md:col-span-8">
          Technical threat investigator with a background in nuclear engineering, intelligence, and distributed systems.
        </p>
      </div>
      <dl className="mt-16 grid gap-6 border-t border-[var(--c-text)] pt-6 sm:grid-cols-3 sm:gap-8">
        {facts.map(([term, value]) => (
          <div key={term}>
            <dt className="ui-label ui-muted">{term}</dt>
            <dd className="ui-body mt-2">{value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

function WorkCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="ui-card ui-focusable flex h-full flex-col">
      <span className="flex items-start justify-between gap-4">
        <span className="ui-heading ui-muted">{String(index + 1).padStart(2, "0")}</span>
        <Badge>{project.visibility === "public" ? "Public" : "Private"}</Badge>
      </span>
      <span className="ui-heading mt-8 block">{project.title}</span>
      <span className="ui-body mt-3 block">{project.summary}</span>
      <span className="mt-auto flex items-end justify-between gap-4 pt-8">
        <span className="ui-label ui-muted">{project.categories.join(" · ")}</span>
        <span className="ui-label whitespace-nowrap">Case study →</span>
      </span>
    </button>
  );
}

function Work({ onOpen }: { onOpen: (slug: string) => void }) {
  const [filter, setFilter] = useState<string>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter as never));
  return (
    <section id="work" className="scroll-mt-20 border-t border-[var(--c-text)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="ui-label">Selected work</h2>
          <p className="ui-label ui-muted" aria-live="polite">
            {shown.length} of {projects.length} projects
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {["All", ...categories].map((c) => (
            <Chip key={c} selected={c === filter} onClick={() => setFilter(c)}>
              {c}
            </Chip>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {shown.map((p) => (
            <WorkCard key={p.slug} project={p} index={projects.indexOf(p)} onOpen={() => onOpen(p.slug)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <article className="ui-panel overflow-y-auto">
      <div className="flex items-start justify-between gap-4">
        <p className="ui-label ui-muted pt-2">
          {project.context} · {project.year}
          {project.team ? ` · ${project.team}` : ""}
        </p>
        <button type="button" onClick={onClose} className="ui-close ui-focusable" aria-label="Close case study">
          ×
        </button>
      </div>
      <h2 className="ui-heading mt-6">{project.title}</h2>
      <p className="ui-body mt-4">{project.summary}</p>

      <h3 className="ui-label mt-10 border-t border-[var(--c-text)] pt-4">What I built</h3>
      <ul className="mt-4 grid gap-3">
        {project.highlights.map((h) => (
          <li key={h} className="ui-body grid grid-cols-[1.25rem_1fr]">
            <span aria-hidden>—</span>
            {h}
          </li>
        ))}
      </ul>

      <h3 className="ui-label mt-10 border-t border-[var(--c-text)] pt-4">Stack</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <Badge key={s}>{s}</Badge>
        ))}
      </div>

      <h3 className="ui-label mt-10 border-t border-[var(--c-text)] pt-4">Code</h3>
      {project.link ? (
        <p className="ui-body mt-4">
          <TextLink href={project.link}>View the code and data on GitHub →</TextLink>
        </p>
      ) : (
        <p className="ui-body mt-4">
          This was a class project, so the code stays private to protect future students’ work. I’m
          happy to walk through it in an interview.
        </p>
      )}
    </article>
  );
}

function About() {
  const outside = [
    ["Backpacking", "A week or more each year. Most recently the Arrigetch Peaks in Alaska, and Iceland."],
    ["Open water swimming and triathlon", ""],
    ["Trail running", ""],
  ];
  return (
    <section id="about" className="scroll-mt-20 border-t border-[var(--c-text)]">
      <div className={`mx-auto max-w-6xl px-5 py-16 sm:px-10 ${GRID}`}>
        <h2 className="ui-label md:col-span-3">About</h2>
        <div className="mt-6 grid gap-5 md:col-span-7 md:mt-0">
          <p className="ui-body">
            I started my career in the U.S. Navy. After graduating from the Naval Academy, I spent five
            years as a submarine officer, working as a nuclear engineer. I moved into intelligence
            analysis, and today I investigate technical threats at Meta.
          </p>
          <p className="ui-body">
            I’m completing an MS in Computer Science at the University of Chicago, where my coursework
            centers on systems programming and distributed systems.
          </p>
        </div>
        <div className="mt-12 md:col-span-9 md:col-start-4">
          <h3 className="ui-label ui-muted mb-2">Outside work</h3>
          {outside.map(([name, detail]) => (
            <div
              key={name}
              className="grid gap-1 border-t border-[var(--c-border)] py-4 last:border-b sm:grid-cols-[240px_1fr] sm:gap-8"
            >
              <p className="ui-body font-bold">{name}</p>
              <p className="ui-body">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type FormState = "editing" | "sending" | "sent";

function Contact({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<FormState>("editing");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const next = {
      email: /^\S+@\S+\.\S+$/.test(email) ? undefined : "Enter an email address like name@example.com.",
      message: message.trim() ? undefined : "Write a short message.",
    };
    setErrors(next);
    if (next.email || next.message) return;
    setState("sending");
    setTimeout(() => setState("sent"), 900);
  }

  return (
    <div className="ui-panel">
      <div className="flex items-start justify-between gap-4">
        <h2 className="ui-heading">Get in touch</h2>
        <button type="button" onClick={onClose} className="ui-close ui-focusable" aria-label="Close">
          ×
        </button>
      </div>
      {state === "sent" ? (
        <div className="mt-6 grid gap-4" role="status">
          <p className="ui-body ui-status-success">✓ Message ready</p>
          <p className="ui-body ui-muted">
            This form is a demo for now, so nothing was sent or saved.
          </p>
          <div>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      ) : (
        <form noValidate onSubmit={submit} className="mt-6 grid gap-5">
          <TextInput label="Name" name="name" autoComplete="name" />
          <div className="grid gap-1.5">
            <TextInput
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="ui-body ui-status-error text-sm">
                {errors.email}
              </p>
            )}
          </div>
          <label className="ui-field">
            <span className="ui-label">Message</span>
            <textarea
              name="message"
              rows={4}
              className="ui-input ui-focusable py-2"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
          </label>
          {errors.message && (
            <p id="message-error" className="ui-body ui-status-error -mt-3 text-sm">
              {errors.message}
            </p>
          )}
          <div className="flex items-center gap-4">
            <Button type="submit" disabled={state === "sending"}>
              {state === "sending" ? "Sending…" : "Send"}
            </Button>
            {state === "sending" && <span className="ui-spinner" aria-label="Sending" />}
          </div>
        </form>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--c-text)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-6 px-5 py-10 sm:px-10">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <TextLink href="https://github.com/kenpiech">GitHub</TextLink>
          <TextLink href="https://github.com/kp145322">Early work on GitHub</TextLink>
          <TextLink href="/">Design process</TextLink>
        </div>
        <p className="ui-label ui-muted">© 2026 Ken Piech</p>
      </div>
    </footer>
  );
}

export function Portfolio() {
  const [open, setOpen] = useState<string | null>(null);
  const [contact, setContact] = useState(false);
  const project = projects.find((p) => p.slug === open);

  return (
    <div className="ui-root min-h-full flex-1" style={themeVars(swiss)}>
      <Nav onContact={() => setContact(true)} />
      <main>
        <Hero />
        <Work onOpen={setOpen} />
        <About />
      </main>
      <Footer />

      <Modal open={!!project} onClose={() => setOpen(null)} label={project?.title ?? "Case study"} variant="sheet">
        {project && <CaseStudy project={project} onClose={() => setOpen(null)} />}
      </Modal>
      <Modal open={contact} onClose={() => setContact(false)} label="Get in touch">
        {contact && <Contact onClose={() => setContact(false)} />}
      </Modal>
    </div>
  );
}
