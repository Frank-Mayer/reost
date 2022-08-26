import type { NextPage } from "next";
import { Clipboard, Compass } from "react-bootstrap-icons";
import copyToClipboard from "copy-to-clipboard";
import { Anchor } from "@mantine/core";
import { noTitle } from "../lib/view";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{noTitle}</title>
      </Head>
      <h2>Der Server</h2>
      <p>
        <b>Was gibt es hier?</b>
      </p>
      <p>Citybuild, Rollplay, MMO, Quests und Freebuild</p>
      <div
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          copyToClipboard("reost.de");
        }}
      >
        <p>
          <b>
            Adresse <Clipboard />
          </b>
        </p>
        <p>reost.de</p>
      </div>
      <Anchor target="_blank" href="https://3dmap.reost.de" component="a">
        <p>
          <b>
            Weltkarte <Compass />
          </b>
        </p>
        <p>3dmap.reost.de</p>
      </Anchor>
    </>
  );
};

export default Home;
