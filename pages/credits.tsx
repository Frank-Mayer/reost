import { Text, Anchor } from "@mantine/core";

const Page = () => (
  <>
    <h2>Credits</h2>
    <ul>
      <li>
        <Text>
          <Anchor target="skfb" href="https://skfb.ly/6A8Eq" component="a">
            &quot;Minecraft village&quot;
          </Anchor>{" "}
          by avatar2233 is licensed under{" "}
          <Anchor
            target="skfb"
            href="http://creativecommons.org/licenses/by/4.0"
            component="a"
          >
            Creative Commons Attribution
          </Anchor>
          .
        </Text>
      </li>
    </ul>
  </>
);

export default Page;
