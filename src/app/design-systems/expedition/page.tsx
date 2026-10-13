import type { Metadata } from "next";
import { DesignSystem } from "@/design/DesignSystem";
import { fontsFor } from "@/design/fonts";
import { expedition } from "@/design/themes";

export const metadata: Metadata = { title: "Expedition · Design System" };

export default function Page() {
  return <DesignSystem theme={expedition} fontClasses={fontsFor.expedition} />;
}
