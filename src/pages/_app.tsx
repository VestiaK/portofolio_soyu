import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Amatic_SC } from "next/font/google";

const amaticSC = Amatic_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
