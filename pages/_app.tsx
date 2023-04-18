import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import AnimatedBackground from "@/components/common/AnimatedBackground";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bytes</title>
      </Head>
      <AnimatedBackground>
        <Component {...pageProps} />
      </AnimatedBackground>
    </div>
  );
}
