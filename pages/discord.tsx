import type { NextPage } from "next";
import { Text, Image, Stack, Group, useMantineTheme } from "@mantine/core";
import type { MantineColor } from "@mantine/core";
import type { DiscordResponse, DiscordWidget } from "../lib/Discord";

type Props = {
  members: DiscordWidget["members"];
};

const statusOrder = ["online", "idle", "dnd"];

export const getStaticProps = async (): Promise<{
  props: Props;
  revalidate?: number;
}> => {
  const res = await fetch(
    "https://discord.com/api/guilds/467053516066652160/widget.json"
  );
  const resObj: DiscordResponse = await res.json();
  const members: DiscordWidget["members"] =
    "members" in resObj && Array.isArray(resObj.members)
      ? resObj.members
          .filter((x) => statusOrder.includes(x.status))
          .sort(
            (a, b) =>
              statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
          )
      : [];

  return {
    props: {
      members,
    },
    revalidate: 3600, // 1 hour
  };
};

const Page: NextPage<Props> = (props) => {
  const theme = useMantineTheme();

  return (
    <>
      <h2>Discord</h2>
      <p>Aktuell {props.members.length} Mitglieder online:</p>
      <Stack spacing="xs">
        {props.members.map((member) => (
          <Group key={member.id}>
            <Image
              src={member.avatar_url}
              radius={theme.fontSizes.lg / 2}
              alt=""
              height={theme.fontSizes.lg}
              width={theme.fontSizes.lg}
            />
            <Text
              color={
                (member.status == "dnd"
                  ? theme.colors.red
                  : member.status == "idle"
                  ? theme.colors.yellow
                  : undefined) as unknown as MantineColor
              }
            >
              {member.username}
            </Text>
          </Group>
        ))}
      </Stack>
    </>
  );
};

export default Page;
