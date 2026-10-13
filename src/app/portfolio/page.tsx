import type { Metadata } from "next";
import { fontsFor } from "@/design/fonts";
import { Portfolio } from "./Portfolio";

export const metadata: Metadata = {
  title: "Ken Piech · Technical threat investigator",
  description:
    "Portfolio of Ken Piech: technical threat investigator at Meta, former submarine officer and nuclear engineer, MS in Computer Science at the University of Chicago.",
};

export default function Page() {
  return (
    <div className={`${fontsFor.swiss} flex flex-1 flex-col`}>
      <Portfolio />
    </div>
  );
}
