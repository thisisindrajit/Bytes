import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Anuphan:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ecd9cb" />
        <meta
          name="description"
          content="Bytes is an AI-powered progressive web app (PWA) that delivers news to users in an innovative and user-friendly way. With its infinite scroll format and AI-generated short summaries of articles, Bytes provides users with a fast and easy way to stay up-to-date on the latest news and events."
        />
        <meta
          name="keywords"
          content="news, artificial intelligence, open source, real time news, summarized news, news app, news aggregator, news reader, news reader app, news reader application, article summarization, emotion prediction, sentiment prediction, bytes, bytes news, bytes news app, bytes news reader, bytes news reader app, bytes news reader application"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "h7cbqbqfdp");
              `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
