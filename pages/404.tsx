import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
} from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import { title } from "../lib/view";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colors.dark[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

const Page = () => {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>{title("404")}</title>
      </Head>
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          Leider ist dies nur eine 404-Seite. Vielleicht hast du dich bei der
          Adresse vertippt, oder die Seite wurde auf eine andere URL verschoben.
        </Text>
        <Group position="center">
          <Link href="/">
            <Button variant="subtle" size="md">
              Zurück zu Startseite
            </Button>
          </Link>
        </Group>
      </Container>
    </>
  );
};

export default Page;
