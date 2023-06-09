import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import AnimatedBackground from "@/components/common/AnimatedBackground";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import "pure-react-carousel/dist/react-carousel.es.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "react-responsive-modal/styles.css";
import 'react-toastify/dist/ReactToastify.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { networkMode: "offlineFirst" },
    mutations: { networkMode: "offlineFirst" },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no"
        />
        <title>Bytes</title>
      </Head>
      <AnimatedBackground>
        {/* In case of very small screens, don't show the UI and show custom message */}
        <div
          id="small-screen-holder"
          className={`overflow-y-auto min-h-[100dvh]`}
        >
          <div className="text-red-500 text-sm/relaxed p-4 text-justify">
            🥺 We apologize, but this device is not supported due to its smaller
            screen dimensions. For an optimal experience, we recommend using a
            device with a larger screen.
          </div>
        </div>
        {/* Main UI */}
        <div id="main-ui-holder">
          <Component {...pageProps} />
        </div>
        <Analytics />
        <ReactQueryDevtools initialIsOpen={false} />
      </AnimatedBackground>
    </QueryClientProvider>
  );
}
