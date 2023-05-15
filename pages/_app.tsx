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
import useIsInPwaMode from "@/hooks/useIsInPwaMode";
import Loading from "@/components/common/Loading";
import Holder from "@/components/common/Holder";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { networkMode: "offlineFirst" },
    mutations: { networkMode: "offlineFirst" },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { isInPwaMode } = useIsInPwaMode();

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
        {isInPwaMode !== null ? (
          <>
            {/* In case of very small screens, don't show the UI and show custom message */}
            <div
              id="small-screen-holder"
              className={`overflow-y-auto ${
                isInPwaMode ? "min-h-screen" : "min-h-[100dvh]"
              }`}
            >
              <div className="text-red-500 text-sm/relaxed p-4 text-justify">
                🥺 We apologize, but this device is not supported due to its
                smaller screen dimensions. For an optimal experience, we
                recommend using a device with a larger screen.
              </div>
            </div>
            {/* Main UI */}
            <div id="main-ui-holder">
              <Component {...pageProps} />
            </div>
          </>
        ) : (
          <Holder className="w-full flex items-center justify-center h-screen">
            <Loading
              heightAndWidthClassesForLoadingIcon="h-10 w-10 lg:h-12 lg:w-12"
              noText
            />
          </Holder>
        )}
      </AnimatedBackground>
      <Analytics />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
