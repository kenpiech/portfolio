import Link from "next/link";

const styles = [
  { slug: "swiss", name: "Swiss" },
  { slug: "pixel", name: "Retro Pixel" },
  { slug: "expedition", name: "Expedition" },
];

export default function Hub() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="text-sm text-zinc-500">UI/UX &amp; Visual Design</p>
      <h1 className="mb-12 text-3xl font-semibold">Ken Piech · Portfolio</h1>

      <section className="mb-10">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest">
          1 · Mood Boards
        </h2>
        <ul className="flex flex-wrap gap-3">
          {styles.map((s) => (
            <li key={s.slug}>
              <Link className="underline" href={`/mood-boards/${s.slug}`}>
                {s.name} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest">
          2 · Design Systems
        </h2>
        <ul className="flex flex-wrap gap-3">
          {styles.map((s) => (
            <li key={s.slug}>
              <Link className="underline" href={`/design-systems/${s.slug}`}>
                {s.name} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest">
          3 · Your Site
        </h2>
        <Link className="underline" href="/portfolio">
          Open Portfolio →
        </Link>
      </section>
    </main>
  );
}
