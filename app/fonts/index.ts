import localFont from "next/font/local";
import { League_Spartan } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});
// REF.: https://ui.shadcn.com/docs/installation/next
export const inter = League_Spartan({
  variable: "--font-sans",
  subsets: ["latin"],
});
