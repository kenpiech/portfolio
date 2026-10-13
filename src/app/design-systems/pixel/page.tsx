import type { Metadata } from "next";
import { DesignSystem } from "@/design/DesignSystem";
import { fontsFor } from "@/design/fonts";
import { pixel } from "@/design/themes";

export const metadata: Metadata = { title: "Retro Pixel · Design System" };

export default function Page() {
  return <DesignSystem theme={pixel} fontClasses={fontsFor.pixel} />;
}
