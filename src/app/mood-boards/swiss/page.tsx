import type { Metadata } from "next";
import { Found, Generated, MoodBoard, photoFinder } from "../board";
import images from "./images.json";
import {
  BigNumeral,
  CirclePoster,
  EventPoster,
  GridStudy,
  Hierarchy,
  LineBurst,
  Swatches,
  Timetable,
  TypeSpecimen,
  UiPieces,
  Wayfinding,
} from "./artifacts";

export const metadata: Metadata = { title: "Swiss · Mood Board" };

const RED = "#e30613";
const photo = photoFinder(images);
const G = ({ children }: { children: React.ReactNode }) => (
  <Generated mark={RED}>{children}</Generated>
);

// Order is deliberate: found and generated pieces alternate so the
// columns mix photos, type, color, and interface studies.
const items = [
  <Found key="clock" img={photo("railway-clock-zurich")} />,
  <G key="event"><EventPoster /></G>,
  <Found key="hofmann1" img={photo("hofmann-gubler")} />,
  <G key="type"><TypeSpecimen /></G>,
  <Found key="corbusier" img={photo("pavillon-le-corbusier")} />,
  <G key="burst"><LineBurst /></G>,
  <Found key="helvetica" img={photo("helvetica-specimen")} />,
  <Found key="braun1" img={photo("braun-et66")} />,
  <G key="swatches"><Swatches /></G>,
  <Found key="calatrava" img={photo("calatrava-milwaukee")} />,
  <G key="wayfinding"><Wayfinding /></G>,
  <Found key="hofmann2" img={photo("hofmann-japan")} />,
  <Found key="stair" img={photo("max-bill-endless")} />,
  <G key="grid"><GridStudy /></G>,
  <Found key="subway" img={photo("nyc-subway")} />,
  <G key="hierarchy"><Hierarchy /></G>,
  <Found key="akz1" img={photo("akzidenz-specimen")} />,
  <Found key="clock2" img={photo("chaux-de-fonds")} />,
  <G key="circle"><CirclePoster /></G>,
  <Found key="stadelhofen" img={photo("calatrava-stadelhofen")} />,
  <G key="timetable"><Timetable /></G>,
  <Found key="hofmann3" img={photo("hofmann-4")} />,
  <Found key="vitra" img={photo("vitra")} />,
  <G key="ui"><UiPieces /></G>,
  <Found key="bill2" img={photo("max-bill-bottrop")} />,
  <G key="numeral"><BigNumeral /></G>,
  <Found key="braun2" img={photo("braun-turntable")} />,
  <Found key="akz2" img={photo("akzidenz-extralight")} />,
];

export default function SwissMoodBoard() {
  return (
    <MoodBoard
      title="Swiss"
      tagline="Grid · Grotesk · One red"
      mark={RED}
      rule="#111"
      className="bg-[#e9e9e6] text-[#111] font-[Helvetica_Neue,Helvetica,Arial,sans-serif]"
      items={items}
      images={images}
    />
  );
}
