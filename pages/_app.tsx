import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import AnimatedBackground from "@/components/common/AnimatedBackground";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Analytics } from "@vercel/analytics/react";
import "pure-react-carousel/dist/react-carousel.es.css";
// import 'react-tooltip/dist/react-tooltip.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bytes</title>
      </Head>
      <AnimatedBackground>
        <Component {...pageProps} />
        <Analytics />
        <ReactQueryDevtools initialIsOpen={false} />
      </AnimatedBackground>
    </QueryClientProvider>
  );
}
