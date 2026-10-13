import Image from "next/image";

// Artifacts built in code for the Swiss board. Each is a small, original
// study of one idea from the style: grid, type, color, or geometry.

const RED = "#e30613";

export function EventPoster() {
  return (
    <div className="flex aspect-[3/4] flex-col bg-white p-5 text-black">
      <div className="flex items-start justify-between">
        <p className="text-[9px] font-bold uppercase leading-tight">
          Ken Piech
          <br />
          Portfolio
          <br />
          2026
        </p>
        <p className="text-3xl font-medium tracking-tight">13.10.26</p>
      </div>
      <p className="mt-6 text-xl font-medium leading-tight tracking-tight">
        Systems, security,
        <br />
        and the work between.
      </p>
      <div className="mt-auto grid grid-cols-5 gap-2">
        <div className="relative col-span-2 aspect-[3/4]">
          <Image
            src="/mood-boards/swiss/calatrava-stadelhofen.jpg"
            alt=""
            fill
            sizes="120px"
            className="object-cover grayscale"
          />
        </div>
        <div className="relative col-span-3 aspect-[4/3] self-end">
          <Image
            src="/mood-boards/swiss/calatrava-milwaukee.jpg"
            alt=""
            fill
            sizes="180px"
            className="object-cover grayscale"
          />
        </div>
      </div>
      <p className="mt-3 text-[9px] leading-tight">github.com/kenpiech</p>
    </div>
  );
}

export function LineBurst() {
  const lines = Array.from({ length: 31 }, (_, i) => {
    const a = (Math.PI / 30) * i - Math.PI / 2;
    return { x: 100 - Math.cos(a) * 90, y: 100 + Math.sin(a) * 90 };
  });
  return (
    <div className="flex aspect-[4/5] flex-col bg-white p-5">
      <p className="text-[10px] text-black">Now you know its name.</p>
      <p className="text-3xl font-bold leading-none tracking-tight" style={{ color: RED }}>
        Swiss
      </p>
      <svg viewBox="0 0 200 200" className="mt-auto w-4/5 self-end">
        {lines.map((p, i) => (
          <line key={i} x1="190" y1="100" x2={p.x} y2={p.y} stroke={RED} strokeWidth="1.5" />
        ))}
      </svg>
    </div>
  );
}

export function GridStudy() {
  return (
    <div className="aspect-square bg-white p-4">
      <div className="grid h-full grid-cols-12 gap-1">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="bg-[#e30613]/10" />
        ))}
      </div>
      <p className="-mt-6 text-[10px] font-bold uppercase tracking-wider">12 columns · 4px gutter</p>
    </div>
  );
}

export function TypeSpecimen() {
  return (
    <div className="bg-white p-5 text-black">
      <p className="text-8xl font-bold leading-none tracking-tighter">Aa</p>
      <div className="mt-4 space-y-1 border-t border-black pt-3 text-sm">
        <p className="font-light">Light 300 — Grotesk</p>
        <p className="font-normal">Regular 400 — Grotesk</p>
        <p className="font-medium">Medium 500 — Grotesk</p>
        <p className="font-bold">Bold 700 — Grotesk</p>
      </div>
    </div>
  );
}

export function Swatches() {
  const colors = [
    { name: "Black", hex: "#111111", text: "white" },
    { name: "Paper", hex: "#f2f2f0", text: "black" },
    { name: "Gray", hex: "#8a8a86", text: "white" },
    { name: "Red", hex: RED, text: "white" },
  ];
  return (
    <div className="grid grid-cols-2">
      {colors.map((c) => (
        <div
          key={c.name}
          className="flex aspect-square flex-col justify-end p-3 text-[10px] font-bold uppercase"
          style={{ background: c.hex, color: c.text }}
        >
          {c.name}
          <span className="font-normal">{c.hex}</span>
        </div>
      ))}
    </div>
  );
}

export function Hierarchy() {
  return (
    <div className="bg-white p-5 text-black">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8a8a86]">Portfolio</p>
      <p className="mt-2 text-4xl font-bold leading-none tracking-tight">Ken Piech</p>
      <p className="mt-2 text-base">Technical threat investigator</p>
      <p className="mt-6 text-xs leading-relaxed">
        Former submarine officer and nuclear engineer. MS in Computer Science, University of
        Chicago.
      </p>
    </div>
  );
}

export function CirclePoster() {
  return (
    <div className="flex aspect-[3/4] flex-col bg-[#111] p-5 text-white">
      <svg viewBox="0 0 100 100" className="w-full">
        <circle cx="38" cy="45" r="34" fill="none" stroke="white" strokeWidth="0.6" />
        <circle cx="52" cy="52" r="24" fill="none" stroke="white" strokeWidth="0.6" />
        <circle cx="62" cy="58" r="14" fill={RED} />
      </svg>
      <p className="mt-auto text-2xl font-bold leading-none tracking-tight">Concrete</p>
      <p className="text-[10px]">Form · Order · Rhythm</p>
    </div>
  );
}

export function Wayfinding() {
  return (
    <div className="flex items-center gap-4 bg-[#111] p-5 text-white">
      <span className="text-5xl leading-none">→</span>
      <div>
        <p className="text-2xl font-bold leading-none">Projects</p>
        <p className="text-sm text-white/70">Systems · Security · Data</p>
      </div>
      <span className="ml-auto h-6 w-6" style={{ background: RED }} />
    </div>
  );
}

export function Timetable() {
  const rows = [
    ["09:12", "Zürich HB", "4"],
    ["09:18", "Basel SBB", "7"],
    ["09:30", "Bern", "12"],
    ["09:41", "Genève", "3"],
  ];
  return (
    <div className="bg-white p-4 text-black">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider">Abfahrt · Departure</p>
      <table className="w-full text-sm tabular-nums">
        <tbody>
          {rows.map(([t, d, p]) => (
            <tr key={t} className="border-t border-black/15">
              <td className="py-1 font-bold">{t}</td>
              <td className="py-1">{d}</td>
              <td className="py-1 text-right">{p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UiPieces() {
  return (
    <div className="space-y-3 bg-white p-5">
      <div className="border-b border-black pb-1 text-sm text-[#8a8a86]">Search projects</div>
      <div className="flex gap-2">
        <span className="px-4 py-2 text-sm font-bold text-white" style={{ background: RED }}>
          Get in touch
        </span>
        <span className="border border-black px-4 py-2 text-sm font-bold">Résumé</span>
      </div>
      <div className="flex gap-3 text-xs font-bold uppercase">
        <span className="border-b-2 border-black">All</span>
        <span className="text-[#8a8a86]">Systems</span>
        <span className="text-[#8a8a86]">Security</span>
      </div>
    </div>
  );
}

export function BigNumeral() {
  return (
    <div className="flex aspect-square flex-col justify-between bg-[#f2f2f0] p-5">
      <p className="text-[10px] font-bold uppercase tracking-wider">Selected work</p>
      <p className="text-[9rem] font-bold leading-[0.8] tracking-tighter" style={{ color: RED }}>
        04
      </p>
    </div>
  );
}
