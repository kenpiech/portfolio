import type { Metadata } from "next";
import { DesignSystem } from "@/design/DesignSystem";
import { fontsFor } from "@/design/fonts";
import { swiss } from "@/design/themes";

export const metadata: Metadata = { title: "Swiss · Design System" };

export default function Page() {
  return <DesignSystem theme={swiss} fontClasses={fontsFor.swiss} />;
}
