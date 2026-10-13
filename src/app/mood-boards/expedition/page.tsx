import type { Metadata } from "next";
import { IBM_Plex_Mono, Libre_Caslon_Text, Stardos_Stencil } from "next/font/google";
import { Found, Generated, MoodBoard, photoFinder } from "../board";
import images from "./images.json";
import {
  Chart,
  Elevation,
  EXP,
  FieldNotes,
  GearTag,
  Palette,
  Patch,
  Repp,
  Topo,
  TrailSign,
  Triathlon,
  TypeSpecimen,
} from "./artifacts";

export const metadata: Metadata = { title: "Expedition · Mood Board" };

const serif = Libre_Caslon_Text({ weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"] });
const stencil = Stardos_Stencil({ weight: ["400", "700"], subsets: ["latin"] });
const mono = IBM_Plex_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-geist-mono" });

const photo = photoFinder(images);
const G = ({ children }: { children: React.ReactNode }) => (
  <Generated mark={EXP.blaze}>{children}</Generated>
);

const items = [
  <Found key="arrigetch" img={photo("arrigetch-peaks")} />,
  <G key="topo"><Topo /></G>,
  <Found key="skate" img={photo("uss-skate")} />,
  <G key="type"><TypeSpecimen serif={serif.className} stencil={stencil.className} /></G>,
  <Found key="landmanna" img={photo("landmannalaugar.")} />,
  <Found key="endurance-sail" img={photo("endurance-full-sail")} />,
  <G key="palette"><Palette /></G>,
  <Found key="usna" img={photo("usna-aerial")} />,
  <G key="notes"><FieldNotes /></G>,
  <Found key="chart" img={photo("noaa-bering")} />,
  <Found key="pass" img={photo("glacier-pass")} />,
  <Found key="endurance-pink" img={photo("endurance-pink-glow")} />,
  <Found key="compass" img={photo("brass-compass")} />,
  <G key="chart2"><Chart /></G>,
  <Found key="swim" img={photo("triathlon-swim")} />,
  <G key="tri"><Triathlon stencil={stencil.className} /></G>,
  <Found key="nps" img={photo("nps-master-file")} />,
  <G key="tag"><GearTag stencil={stencil.className} /></G>,
  <G key="repp"><Repp /></G>,
  <Found key="endurance-night" img={photo("endurance-night")} />,
  <Found key="camp" img={photo("thunder-valley")} />,
  <G key="elevation"><Elevation /></G>,
  <Found key="sanjuan" img={photo("uss-san-juan")} />,
  <Found key="endurance-ice" img={photo("endurance-pack-ice")} />,
  <Found key="topo" img={photo("usgs-topo")} />,
  <G key="sign"><TrailSign serif={serif.className} /></G>,
  <Found key="runner" img={photo("trail-runner")} />,
  <Found key="glacier" img={photo("arrigetch-glacier")} />,
  <G key="patch"><Patch serif={serif.className} /></G>,
  <Found key="endurance-color" img={photo("endurance-antarctica")} />,
];

export default function ExpeditionMoodBoard() {
  return (
    <MoodBoard
      title="Expedition"
      tagline="Charts · Canvas · Navy · One blaze of orange"
      mark={EXP.blaze}
      rule={EXP.navy}
      className={`bg-[#ece6d8] text-[#14213d] ${mono.variable} [&_header_p]:font-mono`}
      titleClassName={`${serif.className} font-normal tracking-tight`}
      items={items}
      images={images}
    />
  );
}
