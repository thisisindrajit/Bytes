import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Anuphan:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="Bytes - News, redefined." />
        <meta name="keywords" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
