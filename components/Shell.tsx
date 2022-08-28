import { ReactNode, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Anchor,
  Image,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { opacity } from "../lib/view";

export const Shell = (props: {
  nav: Array<{ label: string; href: string }>;
  children: ReactNode;
}) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  return (
    <AppShell
      styles={{
        main: {
          background: opacity(theme.colors.dark[8]),
          paddingBottom: "6rem",
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          style={{
            backgroundColor: opacity(theme.colors.dark[7]),
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          {props.nav.map(({ label, href }) =>
            router.pathname == href ? (
              <Text
                style={{
                  fontSize: 24,
                }}
                key={"nav_" + label}
              >
                {label}
              </Text>
            ) : (
              <Link key={"nav_" + label} href={href}>
                <Anchor
                  style={{
                    fontSize: 24,
                  }}
                  href={href}
                  target={href.startsWith("https://") ? "_blank" : "_self"}
                  component="a"
                >
                  {label}
                </Anchor>
              </Link>
            )
          )}
        </Navbar>
      }
      header={
        <Header
          height={70}
          p="md"
          style={{
            backgroundColor: opacity(theme.colors.dark[7]),
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Image src="/img/icon.webp" alt="Reost.de" width={50} height={50} />
          </div>
        </Header>
      }
    >
      {props.children}
    </AppShell>
  );
};
