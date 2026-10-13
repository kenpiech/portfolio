"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";

// The component library. Styling lives in ui.css; every component accepts
// `force` so the design system pages can show hover, focus, and pressed.

type Force = "hover" | "focus" | "pressed";

export function Button({
  variant = "primary",
  force,
  selected,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  force?: Force;
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      data-force={force}
      aria-pressed={selected}
      className={`ui-btn ui-btn--${variant} ui-focusable ${className}`}
      {...props}
    />
  );
}

export function TextLink({
  force,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { force?: Force }) {
  return <a data-force={force} className="ui-link ui-focusable" {...props} />;
}

export function TextInput({
  label,
  force,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; force?: Force }) {
  return (
    <label className="ui-field">
      <span className="ui-label">{label}</span>
      <input data-force={force} className="ui-input ui-focusable" {...props} />
    </label>
  );
}

export function Select({
  label,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }) {
  return (
    <label className="ui-field">
      <span className="ui-label">{label}</span>
      <span className="ui-select-wrap">
        <select className="ui-select ui-focusable" {...props}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </span>
    </label>
  );
}

export function Checkbox({
  label,
  type = "checkbox",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; type?: "checkbox" | "radio" }) {
  return (
    <label className="ui-check">
      <input type={type} className="ui-focusable" {...props} />
      {label}
    </label>
  );
}

export function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className="ui-toggle ui-focusable"
    >
      <span className="ui-toggle-track">
        <span className="ui-toggle-thumb" />
      </span>
      {label}
    </button>
  );
}

export function Tabs({
  tabs,
  value,
  onChange,
  label,
}: {
  tabs: string[];
  value: string;
  onChange: (tab: string) => void;
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="ui-tabs">
      {tabs.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={t === value}
          onClick={() => onChange(t)}
          className="ui-tab ui-focusable"
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function Chip({
  selected,
  force,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean; force?: Force }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      data-force={force}
      className="ui-chip ui-focusable"
      {...props}
    />
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="ui-badge">{children}</span>;
}

export function ProjectCard({
  project,
  onOpen,
  force,
}: {
  project: Project;
  onOpen?: () => void;
  force?: Force;
}) {
  return (
    <button type="button" onClick={onOpen} data-force={force} className="ui-card ui-focusable">
      <span className="flex items-start justify-between gap-3">
        <span className="ui-label ui-muted">{project.categories.join(" · ")}</span>
        <Badge>{project.visibility === "public" ? "Public" : "Private"}</Badge>
      </span>
      <span className="ui-heading mt-3 block">{project.title}</span>
      <span className="ui-body mt-2 block">{project.summary}</span>
      <span className="ui-label ui-muted mt-4 block">{project.stack.join(" · ")}</span>
    </button>
  );
}

export function ProjectRow({
  project,
  onOpen,
  force,
}: {
  project: Project;
  onOpen?: () => void;
  force?: Force;
}) {
  return (
    <button type="button" onClick={onOpen} data-force={force} className="ui-row ui-focusable">
      <span>{project.title}</span>
      <span className="ui-label ui-muted">{project.year}</span>
      <span aria-hidden>→</span>
    </button>
  );
}

export function ProjectDetail({ project, onClose }: { project: Project; onClose?: () => void }) {
  return (
    <div className="ui-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="ui-label ui-muted">
            {project.context} · {project.year}
            {project.team ? ` · ${project.team}` : ""}
          </p>
          <h3 className="ui-heading mt-2">{project.title}</h3>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} className="ui-close ui-focusable" aria-label="Close">
            ×
          </button>
        )}
      </div>
      <p className="ui-body mt-3">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <Badge key={s}>{s}</Badge>
        ))}
      </div>
      <p className="ui-body ui-muted mt-4 text-[0.9em]">
        {project.visibility === "private"
          ? "Class project. Code stays private; walkthrough available on request."
          : "Code and data are public."}
      </p>
      {project.link && (
        <p className="mt-2">
          <TextLink href={project.link}>View on GitHub</TextLink>
        </p>
      )}
    </div>
  );
}

export function Modal({
  open,
  onClose,
  children,
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="ui-modal"
    >
      {children}
    </dialog>
  );
}
