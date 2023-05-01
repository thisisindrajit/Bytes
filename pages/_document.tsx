import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Anuphan:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ecd9cb" />
        <meta name="description" content="Bytes - News, redefined." />
        <meta name="keywords" content="news, artificial intelligence, open source, real time news, summarized news" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
