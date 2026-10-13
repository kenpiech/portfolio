import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { Found, Generated, MoodBoard, photoFinder } from "../board";
import images from "./images.json";
import {
  Buttons,
  Crt,
  Dialog,
  Dither,
  HighScores,
  Hud,
  Icons,
  PAL,
  Palette,
  Peaks,
  Submarine,
  Truck,
  TypeSpecimen,
} from "./artifacts";
import { Battle, DexEntry, Overworld, StartMenu } from "./gbc";

export const metadata: Metadata = { title: "Retro Pixel · Mood Board" };

const display = Press_Start_2P({ weight: "400", subsets: ["latin"] });
const body = VT323({ weight: "400", subsets: ["latin"] });

const photo = photoFinder(images);
const G = ({ children }: { children: React.ReactNode }) => (
  <Generated mark={PAL.red}>{children}</Generated>
);
// Pixel art keeps hard edges when scaled; photos stay smooth.
const crisp = "[image-rendering:pixelated]";

const items = [
  <Found key="scores" img={photo("highest-scores")} />,
  <G key="sub"><Submarine /></G>,
  <Found key="gameboy" img={photo("game-boy.")} />,
  <G key="overworld"><Overworld /></G>,
  <G key="type"><TypeSpecimen display={display.className} body={body.className} /></G>,
  <Found key="landscape" img={photo("landscape")} className={crisp} />,
  <G key="scores2"><HighScores /></G>,
  <Found key="c64" img={photo("commodore-64")} />,
  <Found key="led" img={photo("green-led-matrix")} />,
  <G key="palette"><Palette /></G>,
  <Found key="city" img={photo("isometric-city")} className={crisp} />,
  <G key="dialog"><Dialog body={body.className} /></G>,
  <Found key="flipper" img={photo("flipper-zero")} />,
  <G key="battle"><Battle /></G>,
  <G key="peaks"><Peaks /></G>,
  <Found key="boot" img={photo("c64-boot-screen")} className={crisp} />,
  <G key="hud"><Hud /></G>,
  <Found key="cabinet" img={photo("marble-madness")} />,
  <G key="crt"><Crt body={body.className} /></G>,
  <Found key="zxgfx" img={photo("zx-spectrum-graphics")} className={crisp} />,
  <Found key="nes" img={photo("nes")} />,
  <G key="truck"><Truck /></G>,
  <Found key="macfonts" img={photo("mac-bitmap-fonts")} className={crisp} />,
  <G key="buttons"><Buttons /></G>,
  <Found key="gbc" img={photo("game-boy-color")} />,
  <G key="dex"><DexEntry body={body.className} /></G>,
  <G key="dither"><Dither /></G>,
  <Found key="atari" img={photo("atari-2600")} />,
  <G key="icons"><Icons /></G>,
  <G key="menu"><StartMenu /></G>,
];

export default function PixelMoodBoard() {
  return (
    <MoodBoard
      title="Retro Pixel"
      tagline="8-bit · Hard edges · High scores"
      mark={PAL.red}
      rule={PAL.cream}
      className={`bg-[#1d1b3a] text-[#fff1e8] ${display.className} [&_header_p]:text-[10px] [&_footer]:font-sans`}
      titleClassName="text-3xl sm:text-5xl tracking-normal font-normal leading-tight"
      items={items}
      images={images}
    />
  );
}
