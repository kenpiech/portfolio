import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Libre_Caslon_Text,
  Press_Start_2P,
  VT323,
} from "next/font/google";

// Each font exposes a CSS variable that themes.ts refers to.

export const pressStart = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-press-start" });
export const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--font-vt323" });
export const libreCaslon = Libre_Caslon_Text({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre-caslon",
});
export const plexSans = IBM_Plex_Sans({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-plex-sans" });
export const plexMono = IBM_Plex_Mono({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-plex-mono" });

export const fontsFor = {
  swiss: "", // system Helvetica, no web font
  pixel: `${pressStart.variable} ${vt323.variable}`,
  expedition: `${libreCaslon.variable} ${plexSans.variable} ${plexMono.variable}`,
};
