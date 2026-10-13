// Artifacts built in code for the Retro Pixel board. Sprites are drawn
// from character maps so every pixel is a deliberate square.

export const PAL = {
  ink: "#0f0e17",
  night: "#1d1b3a",
  sea: "#1f4e79",
  sky: "#29adff",
  pearl: "#9fb4c4",
  green: "#00e436",
  amber: "#ffa300",
  red: "#ff004d",
  cream: "#fff1e8",
  gray: "#5f574f",
};

type Colors = Record<string, string>;

export function Sprite({
  map,
  colors,
  className = "",
  label,
}: {
  map: string[];
  colors: Colors;
  className?: string;
  label: string;
}) {
  const w = Math.max(...map.map((r) => r.length));
  return (
    <svg
      viewBox={`0 0 ${w} ${map.length}`}
      shapeRendering="crispEdges"
      className={className}
      role="img"
      aria-label={label}
    >
      {map.flatMap((row, y) =>
        [...row].map((ch, x) =>
          colors[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={colors[ch]} /> : null,
        ),
      )}
    </svg>
  );
}

function Frame({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div
      className="border-4 border-[#0f0e17] p-4"
      style={{ background: bg, color: bg === PAL.cream ? PAL.ink : PAL.cream }}
    >
      {children}
    </div>
  );
}

export function Submarine() {
  const map = [
    "..........................",
    "............k.............",
    "............k.............",
    "..........kkkkk...........",
    "..........kgggk...........",
    "..........kgggk...........",
    "...kkkkkkkkgggkkkkkkkkk...",
    "..kgggggggggggggggggggkk..",
    ".kgggwgggwgggwgggggggggk.k",
    ".kgggggggggggggggggggggkkk",
    "..kgggggggggggggggggggkk.k",
    "...kkkkkkkkkkkkkkkkkkkk...",
    "..........................",
    "~~~..~~~~...~~~~~..~~~~...",
  ];
  return (
    <Frame bg={PAL.sea}>
      <Sprite
        map={map}
        colors={{ k: PAL.ink, g: PAL.gray, w: PAL.amber, "~": PAL.sky }}
        className="w-full"
        label="Pixel submarine"
      />
      <p className="mt-3 text-[10px] text-[#fff1e8]">LV.1 SUBMARINER</p>
    </Frame>
  );
}

export function Peaks() {
  const map = [
    "........................",
    "...a........a...........",
    "..aaa......aaa.....a....",
    "..asa.....aasaa...aaa...",
    ".aassa...aasssaa.aasaa..",
    ".asssaa.aasssssaaassssa.",
    "aassssaaasssssssaassssaa",
    "assssssaasssssssssssssss",
    "ssssssssssssssssssssssss",
    "gggggggggggggggggggggggg",
  ];
  return (
    <Frame bg={PAL.night}>
      <Sprite
        map={map}
        colors={{ a: PAL.cream, s: PAL.gray, g: PAL.green }}
        className="w-full"
        label="Pixel mountain range"
      />
      <p className="mt-3 text-[10px] text-[#fff1e8]">WORLD 2-1 · ARRIGETCH</p>
    </Frame>
  );
}

export function Truck() {
  const map = [
    "............................",
    "..............ppppppp.......",
    ".............pwwwpwwwp......",
    "............pwwwwpwwwwp.....",
    "ddddddddddd.pwwwwpwwwwwpp...",
    "pppppppppppdpppppppppppppppp",
    "pppppppppppppppppppppppppppa",
    "pppppppppppppppppppppppppppp",
    "pkkkkkppppppppppppppkkkkkppp",
    ".kkggkk............kkggkk...",
    "..kkkk..............kkkk....",
  ];
  return (
    <Frame bg={PAL.cream}>
      <Sprite
        map={map}
        colors={{ p: PAL.pearl, w: PAL.sky, k: PAL.ink, g: PAL.gray, a: PAL.amber, d: "#6f8595" }}
        className="w-full"
        label="Pixel pickup truck in sky pearl blue"
      />
      <p className="mt-3 text-[10px]">VEHICLE: SKY PEARL</p>
    </Frame>
  );
}

export function Palette() {
  return (
    <div className="grid grid-cols-5 border-4 border-[#0f0e17]">
      {Object.entries(PAL).map(([name, hex]) => (
        <div key={name} className="aspect-square" style={{ background: hex }} title={name} />
      ))}
      <p className="col-span-5 bg-[#0f0e17] px-2 py-1 text-[10px] text-[#fff1e8]">10-COLOR PALETTE</p>
    </div>
  );
}

export function TypeSpecimen({ display, body }: { display: string; body: string }) {
  return (
    <Frame bg={PAL.cream}>
      <p className={`${display} text-6xl leading-none`}>Aa</p>
      <p className={`${display} mt-4 text-sm leading-relaxed`}>PRESS START</p>
      <p className={`${body} mt-2 text-2xl leading-none`}>The quick brown fox jumps 0123456789</p>
    </Frame>
  );
}

export function Dialog({ body }: { body: string }) {
  return (
    <div className="border-4 border-[#fff1e8] bg-[#0f0e17] p-4 text-[#fff1e8] outline outline-4 outline-[#0f0e17]">
      <p className={`${body} text-2xl leading-tight`}>
        KEN joined the party!
        <br />
        He knows SYSTEMS and SECURITY.
      </p>
      <p className="mt-2 text-right text-sm">▼</p>
    </div>
  );
}

export function Hud() {
  const stats = [
    ["SYS", 9, PAL.green],
    ["SEC", 10, PAL.red],
    ["DATA", 7, PAL.sky],
    ["SWIM", 8, PAL.amber],
  ] as const;
  return (
    <Frame bg={PAL.ink}>
      {stats.map(([name, n, c]) => (
        <div key={name} className="mb-2 flex items-center gap-2 text-[10px] text-[#fff1e8]">
          <span className="w-10">{name}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className="h-3 w-3" style={{ background: i < n ? c : PAL.night }} />
            ))}
          </div>
        </div>
      ))}
    </Frame>
  );
}

export function HighScores() {
  const rows = [
    ["1ST", "MPCSFAAS", "52040"],
    ["2ND", "MSH SHELL", "51082"],
    ["3RD", "PW CRACKER", "48812"],
    ["4TH", "KR ENERGY", "21011"],
  ];
  return (
    <Frame bg={PAL.ink}>
      <p className="mb-3 text-center text-xs text-[#ff004d]">HIGH SCORES</p>
      {rows.map(([rank, name, score], i) => (
        <p
          key={rank}
          className="flex justify-between text-[10px] leading-6"
          style={{ color: [PAL.amber, PAL.green, PAL.sky, PAL.cream][i] }}
        >
          <span>{rank}</span>
          <span>{name}</span>
          <span>{score}</span>
        </p>
      ))}
    </Frame>
  );
}

export function Buttons() {
  return (
    <Frame bg={PAL.cream}>
      <div className="flex flex-wrap gap-3 text-[10px]">
        <span className="border-4 border-[#0f0e17] bg-[#ff004d] px-3 py-2 text-[#fff1e8] shadow-[4px_4px_0_#0f0e17]">
          START
        </span>
        <span className="translate-x-1 translate-y-1 border-4 border-[#0f0e17] bg-[#ff004d] px-3 py-2 text-[#fff1e8]">
          PRESSED
        </span>
        <span className="border-4 border-[#0f0e17] bg-[#fff1e8] px-3 py-2 shadow-[4px_4px_0_#0f0e17]">
          OPTIONS
        </span>
      </div>
    </Frame>
  );
}

export function Dither() {
  // Ordered (Bayer) dither from night to sky, one row of cells per band
  const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const size = 32;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges" className="w-full border-4 border-[#0f0e17]" role="img" aria-label="Ordered dither gradient">
      {Array.from({ length: size * size }, (_, i) => {
        const x = i % size;
        const y = Math.floor(i / size);
        const t = (y / size) * 16;
        const on = bayer[(y % 4) * 4 + (x % 4)] < t;
        return <rect key={i} x={x} y={y} width="1" height="1" fill={on ? PAL.sky : PAL.night} />;
      })}
    </svg>
  );
}

export function Crt({ body }: { body: string }) {
  return (
    <div className="relative overflow-hidden rounded-[18px] border-8 border-[#5f574f] bg-[#071a0e] p-5">
      <p className={`${body} text-2xl leading-tight text-[#00e436]`}>
        &gt; LOAD &quot;PORTFOLIO&quot;
        <br />
        SEARCHING...
        <br />
        FOUND 4 PROJECTS
        <br />
        READY.<span className="animate-pulse">█</span>
      </p>
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent_0_2px,rgba(0,0,0,0.35)_2px_4px)]" />
    </div>
  );
}

export function Icons() {
  const heart = [".rr.rr.", "rrrrrrr", "rrrrrrr", ".rrrrr.", "..rrr..", "...r..."];
  const coin = ["..aaa..", ".aacaa.", "aacaaaa", "aacaaaa", ".aacaa.", "..aaa.."];
  const flag = ["kgg....", "kgggg..", "kgggggg", "kgg....", "k......", "k......"];
  const key = [".aaa...", "aa.aa..", ".aaaaaa", "....a.a", ".......", "......."];
  return (
    <Frame bg={PAL.night}>
      <div className="grid grid-cols-4 gap-4">
        {[heart, coin, flag, key].map((m, i) => (
          <Sprite
            key={i}
            map={m}
            colors={{ r: PAL.red, a: PAL.amber, c: PAL.cream, g: PAL.green, k: PAL.cream }}
            className="w-full"
            label={["Heart", "Coin", "Flag", "Key"][i]}
          />
        ))}
      </div>
    </Frame>
  );
}
