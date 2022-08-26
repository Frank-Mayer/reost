import type { NextPage } from "next";
import { Instagram, Compass, Github } from "react-bootstrap-icons";
import { Text, Image, Stack, Group, Anchor } from "@mantine/core";
import Head from "next/head";
import { title } from "../lib/view";

type Props = {
  teamMembers: Array<{
    uuid: string;
    head: string;
    name: string;
    instagram?: string;
    github?: string;
    homepage?: string;
  }>;
};

const getHead = (uuid: string) => `https://mc-heads.net/head/${uuid}/64`;

const getName = async (uuid: string) => {
  const resp = await fetch(
    "https://sessionserver.mojang.com/session/minecraft/profile/" + uuid
  );
  if (resp.status === 200) {
    const json = await resp.json();
    return json.name;
  } else {
    return "N/A";
  }
};

export const getStaticProps = async (): Promise<{
  props: Props;
  revalidate?: number;
}> => {
  return {
    props: {
      teamMembers: [
        {
          head: getHead("d3e7009f11754aa790308aa9386fca3b"),
          name: await getName("d3e7009f11754aa790308aa9386fca3b"),
          uuid: "d3e7009f11754aa790308aa9386fca3b",
          instagram: "easysix",
        },
        {
          head: getHead("f8963be18e974c7f8bce4af9029c0488"),
          name: await getName("f8963be18e974c7f8bce4af9029c0488"),
          uuid: "f8963be18e974c7f8bce4af9029c0488",
          instagram: "ichbinanny",
        },
        {
          head: getHead("b44ede9900b14e5998c6dd4c696e742d"),
          name: await getName("b44ede9900b14e5998c6dd4c696e742d"),
          uuid: "b44ede9900b14e5998c6dd4c696e742d",
          instagram: "ichbinmanja",
        },
        {
          head: getHead("2fb36f12426b46109287d43c24486db4"),
          name: await getName("2fb36f12426b46109287d43c24486db4"),
          uuid: "2fb36f12426b46109287d43c24486db4",
          homepage: "https://frank-mayer.io",
          github: "Frank-Mayer",
        },
        {
          head: getHead("de791f780c3b4a42a6ffe83a621c3be3"),
          name: await getName("de791f780c3b4a42a6ffe83a621c3be3"),
          uuid: "de791f780c3b4a42a6ffe83a621c3be3",
        },
      ],
    },
    revalidate: 604800, // 1 week
  };
};

const Page: NextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>{title("Team")}</title>
      </Head>
      <h2>Unser Team</h2>
      <Stack spacing="xs">
        {props.teamMembers.map((member) => (
          <Group key={member.uuid}>
            <Image src={member.head} alt="" height={64} width={64} />
            <Stack spacing="xs">
              <Text>{member.name}</Text>
              {member.github || member.homepage || member.instagram ? (
                <Group spacing="xs">
                  {member.homepage ? (
                    <Anchor href={member.homepage} component="a">
                      <Compass /> {member.homepage}
                    </Anchor>
                  ) : null}
                  {member.instagram ? (
                    <Anchor
                      href={"https://www.instagram.com/" + member.instagram}
                      component="a"
                    >
                      <Instagram /> {member.instagram}
                    </Anchor>
                  ) : null}
                  {member.github ? (
                    <Anchor
                      href={"https://github.com/" + member.github}
                      component="a"
                    >
                      <Github /> {member.github}
                    </Anchor>
                  ) : null}
                </Group>
              ) : null}
            </Stack>
          </Group>
        ))}
      </Stack>
    </>
  );
};

export default Page;
