import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Shell } from "../components/Shell";
import "../style/index.scss";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="importmap"
        type="importmap"
        dangerouslySetInnerHTML={{
          __html:
            '{"imports": {"three": "https://unpkg.com/three@0.143.0/build/three.module.js"}}',
        }}
      />
      <Script type="module" src="/background.js" />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          respectReducedMotion: true,
          defaultRadius: "md",
          dir: "ltr",
        }}
      >
        <Shell
          nav={[
            { href: "/", label: "Home" },
            { href: "/discord", label: "Discord" },
            { href: "/rules", label: "Regeln" },
            { href: "/team", label: "Team" },
            { href: "/contact", label: "Kontakt" },
            { href: "https://wiki.reost.de", label: "Wiki" },
            { href: "/credits", label: "Credits" },
          ]}
        >
          <Component {...pageProps} />
        </Shell>
      </MantineProvider>
    </>
  );
}

export default MyApp;
