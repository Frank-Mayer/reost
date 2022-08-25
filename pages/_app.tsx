import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Shell } from "../components/Shell";
import "../style/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
        ]}
      >
        <Component {...pageProps} />
      </Shell>
    </MantineProvider>
  );
}

export default MyApp;
