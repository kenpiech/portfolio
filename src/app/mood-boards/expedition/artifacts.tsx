// Artifacts built in code for the Expedition board: navigation, field
// notes, and East Coast cloth, in a palette taken from the truck, the
// Academy, canvas, and a trail blaze.

export const EXP = {
  pearl: "#9fb1bf", // Diffused Sky Pearl
  navy: "#14213d",
  canvas: "#d8c9a7",
  paper: "#f4f0e6",
  forest: "#3d4f3a",
  blaze: "#e4572e",
  ink: "#1d232b",
};

// Irregular closed contour: a circle whose radius wobbles with a few sines
function contour(cx: number, cy: number, r: number, seed: number) {
  const pts = Array.from({ length: 48 }, (_, i) => {
    const a = (i / 48) * Math.PI * 2;
    const k = r * (1 + 0.12 * Math.sin(3 * a + seed) + 0.07 * Math.sin(5 * a + seed * 2));
    return `${(cx + Math.cos(a) * k).toFixed(1)},${(cy + Math.sin(a) * k * 0.8).toFixed(1)}`;
  });
  return `M${pts.join("L")}Z`;
}

export function Topo() {
  return (
    <div className="bg-[#f4f0e6] p-4">
      <svg viewBox="0 0 200 160" className="w-full" role="img" aria-label="Topographic contour lines">
        {Array.from({ length: 11 }, (_, i) => (
          <path
            key={i}
            d={contour(96 + i * 1.5, 84 - i, 12 + i * 8, 1.3)}
            fill="none"
            stroke={EXP.forest}
            strokeWidth={i % 5 === 0 ? 0.9 : 0.4}
          />
        ))}
        <path d="M96 76 l5 9 h-10 z" fill={EXP.blaze} />
        <text x="104" y="80" fontSize="6" fill={EXP.ink} className="font-mono">
          7,190 ft
        </text>
      </svg>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[#1d232b]">
        Contour interval 100 ft
      </p>
    </div>
  );
}

export function Palette() {
  const swatches = [
    ["Sky Pearl", EXP.pearl, EXP.ink],
    ["Academy Navy", EXP.navy, EXP.paper],
    ["Canvas", EXP.canvas, EXP.ink],
    ["Forest", EXP.forest, EXP.paper],
    ["Field Paper", EXP.paper, EXP.ink],
    ["Blaze", EXP.blaze, EXP.paper],
  ];
  return (
    <div className="grid grid-cols-3">
      {swatches.map(([name, bg, fg]) => (
        <div
          key={name}
          className="flex aspect-[4/5] flex-col justify-end p-2 font-mono text-[9px] uppercase"
          style={{ background: bg, color: fg }}
        >
          {name}
          <span className="opacity-70">{bg}</span>
        </div>
      ))}
    </div>
  );
}

export function TypeSpecimen({ serif, stencil }: { serif: string; stencil: string }) {
  return (
    <div className="bg-[#f4f0e6] p-5 text-[#14213d]">
      <p className={`${serif} text-7xl leading-none`}>Aa</p>
      <p className={`${serif} mt-3 text-xl italic`}>Seven days in the Brooks Range</p>
      <p className={`${stencil} mt-3 text-2xl uppercase tracking-wide`}>Expedition 01</p>
      <p className="mt-2 font-mono text-xs">67°24′N 154°03′W · DAY 04</p>
    </div>
  );
}

export function Chart() {
  const soundings = [
    [30, 40, "12"], [70, 30, "18"], [120, 50, "27"], [160, 35, "31"],
    [45, 90, "9"], [100, 100, "22"], [150, 95, "35"], [80, 130, "15"], [135, 140, "40"],
  ] as const;
  return (
    <div className="bg-[#e9eef1] p-3">
      <svg viewBox="0 0 200 170" className="w-full" role="img" aria-label="Nautical chart with soundings">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="170" stroke={EXP.pearl} strokeWidth="0.4" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 28} x2="200" y2={i * 28} stroke={EXP.pearl} strokeWidth="0.4" />
        ))}
        <path d="M0 0 H60 Q40 40 20 60 T0 120 Z" fill={EXP.canvas} stroke={EXP.ink} strokeWidth="0.5" />
        <path d="M10 0 Q50 45 30 70 T10 130" fill="none" stroke={EXP.navy} strokeWidth="0.4" strokeDasharray="2 1.5" />
        {soundings.map(([x, y, d]) => (
          <text key={`${x}-${y}`} x={x} y={y} fontSize="6" fill={EXP.navy} className="font-serif italic">
            {d}
          </text>
        ))}
        <circle cx="170" cy="140" r="16" fill="none" stroke={EXP.navy} strokeWidth="0.5" />
        <path d="M170 122 L172 140 L170 158 L168 140 Z" fill={EXP.blaze} />
      </svg>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-[#14213d]">
        Soundings in fathoms
      </p>
    </div>
  );
}

export function FieldNotes() {
  return (
    <div
      className="bg-[#f6f3df] p-5 font-mono text-xs leading-6 text-[#1d232b]"
      style={{
        backgroundImage:
          "linear-gradient(#c9d4cf 1px, transparent 1px), linear-gradient(90deg, #c9d4cf 1px, transparent 1px)",
        backgroundSize: "12px 12px",
      }}
    >
      <p className="font-bold uppercase">Day 04 · Arrigetch Creek</p>
      <p>Up at 0530. Fog lifting by 0800.</p>
      <p>Crossed creek at the braid, knee deep.</p>
      <p>Camp under the spires. Clear night.</p>
      <p className="mt-2 text-[#e4572e]">→ Next: Aquarius Valley</p>
    </div>
  );
}

export function GearTag({ stencil }: { stencil: string }) {
  return (
    <div className="flex justify-center bg-[#3d4f3a] p-8">
      <div className="relative w-44 rounded-sm bg-[#d8c9a7] px-4 pb-4 pt-8 text-[#14213d] shadow-[2px_3px_0_rgba(0,0,0,0.25)]">
        <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#14213d]" />
        <p className={`${stencil} text-xl uppercase leading-none`}>K. Piech</p>
        <p className="mt-2 font-mono text-[9px] uppercase leading-snug">
          Pack 1 of 2
          <br />
          Bear can inside
          <br />
          If found: github.com/kenpiech
        </p>
      </div>
    </div>
  );
}

export function TrailSign({ serif }: { serif: string }) {
  return (
    <div className="bg-[#9fb1bf] p-6">
      <div className="border-2 border-[#f4f0e6] bg-[#5a3d2b] px-4 py-3 text-[#f4f0e6]">
        <p className={`${serif} text-lg`}>Arrigetch Creek</p>
        <p className="flex justify-between font-mono text-xs">
          <span>Aquarius Valley</span>
          <span>6.4 mi →</span>
        </p>
      </div>
      <div className="mx-auto mt-0 h-10 w-3 bg-[#5a3d2b]" />
      <span className="mx-auto block h-5 w-3 bg-[#e4572e]" />
    </div>
  );
}

export function Elevation() {
  const pts = [0, 4, 9, 7, 15, 22, 18, 30, 34, 26, 20, 24, 12, 8];
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 200} ${70 - p * 1.8}`).join(" ");
  return (
    <div className="bg-[#14213d] p-4 text-[#f4f0e6]">
      <p className="font-mono text-[10px] uppercase tracking-widest">Elevation · Day 04</p>
      <svg viewBox="0 0 200 75" className="mt-2 w-full" role="img" aria-label="Elevation profile">
        <path d={`${path} L200 75 L0 75 Z`} fill={EXP.pearl} opacity="0.25" />
        <path d={path} fill="none" stroke={EXP.pearl} strokeWidth="1.2" />
        <circle cx={(8 / 13) * 200} cy={70 - 34 * 1.8} r="2.5" fill={EXP.blaze} />
      </svg>
    </div>
  );
}

export function Triathlon({ stencil }: { stencil: string }) {
  const legs = [
    ["Swim", "1.5 km"],
    ["Bike", "40 km"],
    ["Run", "10 km"],
  ];
  return (
    <div className="grid grid-cols-3 divide-x divide-[#14213d] border-2 border-[#14213d] bg-[#f4f0e6] text-[#14213d]">
      {legs.map(([leg, dist]) => (
        <div key={leg} className="p-3">
          <p className={`${stencil} text-lg uppercase leading-none`}>{leg}</p>
          <p className="mt-1 font-mono text-[10px]">{dist}</p>
        </div>
      ))}
    </div>
  );
}

export function Oxford() {
  return (
    <div
      className="flex aspect-[4/3] items-end p-4"
      style={{
        backgroundColor: "#b9cde0",
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.55) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(20,33,61,0.12) 0 1px, transparent 1px 3px)",
      }}
    >
      <p className="bg-[#f4f0e6] px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-[#14213d]">
        Oxford cloth · button-down
      </p>
    </div>
  );
}

export function Repp() {
  return (
    <div
      className="flex aspect-[4/3] items-end p-4"
      style={{
        backgroundImage: `repeating-linear-gradient(135deg, ${EXP.navy} 0 22px, ${EXP.blaze} 22px 28px, ${EXP.navy} 28px 34px, ${EXP.canvas} 34px 38px)`,
      }}
    >
      <p className="bg-[#f4f0e6] px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-[#14213d]">
        Repp stripe
      </p>
    </div>
  );
}

export function Patch({ serif }: { serif: string }) {
  return (
    <div className="flex justify-center bg-[#d8c9a7] p-8">
      <svg viewBox="0 0 120 120" className="w-40" role="img" aria-label="Expedition patch">
        <circle cx="60" cy="60" r="56" fill={EXP.navy} stroke={EXP.canvas} strokeWidth="3" strokeDasharray="3 2" />
        <path d="M22 78 L42 50 L52 62 L64 38 L82 66 L90 58 L100 78 Z" fill={EXP.paper} />
        <path d="M64 38 l4 7 h-8 z" fill={EXP.blaze} />
        <path id="arc" d="M20 60 A40 40 0 0 1 100 60" fill="none" />
        <text fontSize="9" fill={EXP.paper} letterSpacing="2" className={serif}>
          <textPath href="#arc" startOffset="50%" textAnchor="middle">
            BROOKS RANGE
          </textPath>
        </text>
        <text x="60" y="96" fontSize="8" fill={EXP.pearl} textAnchor="middle" className="font-mono">
          ALASKA
        </text>
      </svg>
    </div>
  );
}
