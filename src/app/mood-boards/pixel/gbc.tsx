import { Sprite } from "./artifacts";

// Game Boy Color-inspired screens: an overworld, a battle, a start menu,
// and a monster dex entry. All tiles, creatures, and names are original;
// the look borrows the handheld RPG era, not any game's characters.

const C: Record<string, string> = {
  G: "#a8e070", // grass
  g: "#58a848", // grass shade
  d: "#287838", // canopy
  D: "#48a050", // canopy light
  k: "#183018", // outline
  b: "#806040", // trunk, door
  S: "#f0d898", // path
  s: "#c8a868", // path speck
  W: "#4890f8", // water
  l: "#b8e0f8", // water glint, glass
  r: "#b03030", // roof shade
  R: "#e85848", // roof
  Y: "#f8e048", // flower, lure
  H: "#f8f0e0", // wall
  F: "#f8c8a0", // face
  N: "#283c78", // jacket
  P: "#8048b0", // monster
  p: "#c8a0e8", // monster belly
  w: "#ffffff",
};

const TILES: Record<string, string[]> = {
  ".": ["GGGGGGGG", "GGGGGgGG", "GGGGGGGG", "GgGGGGGG", "GGGGGGGG", "GGGGGGgG", "GGGGGGGG", "GGgGGGGG"],
  t: ["GgGGGgGG", "ggGGggGG", "gggGgggG", "GGGGGGGG", "GGgGGGgG", "GggGGggG", "gggGgggG", "GGGGGGGG"],
  T: ["GGkkkkGG", "GkddddkG", "kddDdddk", "kdDDddDk", "kdddddDk", "GkddddkG", "GGkbbkGG", "GGGbbGGG"],
  p: ["SSSSSSSS", "SSsSSSSS", "SSSSSSsS", "SSSSSSSS", "SsSSSSSS", "SSSSSsSS", "SSSSSSSS", "SSSsSSSS"],
  w: ["WWWWWWWW", "WWWWWWWW", "WlllWWWW", "WWWWWWWW", "WWWWWWWW", "WWWWWlll", "WWWWWWWW", "WWWWWWWW"],
  f: ["GGGGGGGG", "GGGRGGGG", "GGRYRGGG", "GGGRGGGG", "GGGgGGGG", "GGGGGGGG", "GGGGGRGG", "GGGGGGGG"],
  r: ["kkkkkkkk", "RRRRRRRR", "rrrrrrrr", "RRRRRRRR", "RRRRRRRR", "rrrrrrrr", "RRRRRRRR", "kkkkkkkk"],
  h: ["HHHHHHHH", "HkkkkHHH", "HkllkHHH", "HkkkkHHH", "HHHHHHHH", "HHHHHHHH", "HHHHHHHH", "kkkkkkkk"],
  d: ["HHHHHHHH", "HHkkkkHH", "HHkbbkHH", "HHkbbkHH", "HHkbbkHH", "HHkbYkHH", "HHkbbkHH", "kkkbbkkk"],
  "@": ["SSkkkkSS", "SkRRRRkS", "kRRRRRRk", "SkFFFFkS", "SkFkkFkS", "SkNNNNkS", "SkNNNNkS", "SSkSSkSS"],
};

const MAP = [
  "TTTTTTTTTT",
  "T..f..wwwT",
  "T.rrr.wwwT",
  "T.hdh....T",
  "T..p..tttT",
  "Tppppptt.T",
  "T..p..tttT",
  "Tf.@...f.T",
  "TTTpTTTTTT",
];

export function Overworld() {
  return (
    <div className="border-4 border-[#183018] bg-[#183018]">
      <svg viewBox="0 0 80 72" shapeRendering="crispEdges" className="block w-full" role="img" aria-label="Top-down RPG overworld with a house, pond, tall grass, and the player">
        <defs>
          {Object.entries(TILES).map(([id, rows]) => (
            <symbol key={id} id={`tile-${id === "." ? "grass" : id === "@" ? "player" : id}`} viewBox="0 0 8 8">
              {rows.flatMap((row, y) =>
                [...row].map((ch, x) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={C[ch]} />),
              )}
            </symbol>
          ))}
        </defs>
        {MAP.flatMap((row, y) =>
          [...row].map((ch, x) => (
            <use
              key={`${x}-${y}`}
              href={`#tile-${ch === "." ? "grass" : ch === "@" ? "player" : ch}`}
              x={x * 8}
              y={y * 8}
              width="8"
              height="8"
            />
          )),
        )}
      </svg>
    </div>
  );
}

const PHISHER = [
  "...YY...........",
  "..YwwY..........",
  "...YY...........",
  "....k..kkkkkk...",
  ".....kkPPPPPPkk.k",
  "...kkPPPPPPPPPPkk",
  "..kPPwkPPPPPPPPPk",
  ".kPPPkkPPPPPPPkPk",
  ".kwPwPwPPpppPPkkk",
  "..kkkkkPpppppPk.k",
  "....kPPPPPPPPk...",
  ".....kkkkkkkk....",
];

const KRAKEN_BACK = [
  ".....kkkkkk.....",
  "...kkRRRRRRkk...",
  "..kRRRRRRRRRRk..",
  ".kRRRrRRRRrRRRk.",
  ".kRRRRRRRRRRRRk.",
  ".kRRRRRRRRRRRRk.",
  "..kRRRRRRRRRRk..",
  "..kRkRkRRkRkRk..",
  ".kRk.kRkkRk.kRk.",
  "kRk..kRk.kRk.kRk",
  "kk....kk..kk..kk",
];

function HpBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-1 text-[7px]">
      <span className="text-[#e8a020]">HP</span>
      <div className="h-1.5 flex-1 rounded-full border border-[#183018] bg-white">
        <div className="h-full rounded-full bg-[#48c048]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Battle() {
  return (
    <div className="border-4 border-[#183018] bg-[#f8f8f0] text-[#183018]">
      <div className="grid grid-cols-2 gap-2 p-3">
        <div className="self-start border-b-2 border-l-2 border-[#183018] pb-1 pl-1 text-[8px]">
          <p>PHISHER</p>
          <p className="text-right">:L12</p>
          <HpBar pct={40} />
        </div>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-3 rounded-[50%] bg-[#a8e070]" />
          <Sprite map={PHISHER} colors={C} className="relative w-full" label="Original anglerfish monster" />
        </div>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-3 rounded-[50%] bg-[#a8e070]" />
          <Sprite map={KRAKEN_BACK} colors={C} className="relative w-full" label="Original red kraken, seen from behind" />
        </div>
        <div className="self-end border-b-2 border-r-2 border-[#183018] pb-1 pr-1 text-[8px]">
          <p>KRAKEN</p>
          <p className="text-right">:L20</p>
          <HpBar pct={85} />
          <p className="text-right text-[7px]">68/ 80</p>
        </div>
      </div>
      <div className="m-1 border-4 border-double border-[#4878c8] bg-white p-2 text-[8px] leading-relaxed">
        A wild PHISHER appeared!
      </div>
    </div>
  );
}

export function StartMenu() {
  const items = ["PROJECTS", "RÉSUMÉ", "ABOUT", "CONTACT", "SAVE"];
  return (
    <div className="flex justify-end border-4 border-[#183018] bg-[#88b8f8] p-3">
      <div className="w-36 border-4 border-double border-[#183018] bg-white px-2 py-1 text-[9px] leading-6 text-[#183018]">
        {items.map((item, i) => (
          <p key={item}>
            <span className={i === 0 ? "" : "invisible"}>▶</span>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export function DexEntry({ body }: { body: string }) {
  return (
    <div className="border-4 border-[#183018] bg-[#e85848] p-2">
      <div className="bg-[#f8f8f0] p-3 text-[#183018]">
        <div className="flex gap-3">
          <div className="w-20 shrink-0 border-2 border-[#183018] bg-[#c8e8f8] p-1">
            <Sprite map={PHISHER} colors={C} className="w-full" label="Phisher" />
          </div>
          <div className="text-[8px] leading-5">
            <p>No.001</p>
            <p>PHISHER</p>
            <p>TYPE/ SOCIAL</p>
          </div>
        </div>
        <p className={`${body} mt-3 text-xl leading-tight`}>
          Dangles a bright lure to trick travelers into giving up their passwords. Ignore the
          glow.
        </p>
      </div>
    </div>
  );
}
