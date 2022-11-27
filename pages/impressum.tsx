import type { NextPage } from "next";
import Showdown from "react-showdown";
import Head from "next/head";
import { title } from "../lib/view";
import { readFile } from "fs/promises";

type Props = {
  md: string;
};

export const getStaticProps = async (): Promise<{ props: Props }> => ({
  props: {
    md: (await readFile("./_content/impressum.md", "utf-8")) ?? "",
  },
});

const Page: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>{title("Impressum")}</title>
      </Head>

      <Showdown
        markdown={props.md}
        options={{
          tables: true,
          flavor: "github",
        }}
      />
    </>
  );
};

export default Page;
