import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5852456121661952"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            id="importmap"
            type="importmap"
            dangerouslySetInnerHTML={{
              __html:
                '{"imports": {"three": "https://unpkg.com/three@0.143.0/build/three.module.js"}}',
            }}
          />
          <script defer async type="module" src="/background.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
