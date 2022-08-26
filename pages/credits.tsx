import { Text, Anchor } from "@mantine/core";

const Page = () => (
  <>
    <h2>Credits</h2>
    <ul>
      <li>
        <Text>
          <Anchor target="_blank" href="https://skfb.ly/6A8Eq" component="a">
            &quot;Minecraft village&quot;
          </Anchor>{" "}
          by avatar2233 is licensed under{" "}
          <Anchor
            target="_blank"
            href="http://creativecommons.org/licenses/by/4.0"
            component="a"
          >
            Creative Commons Attribution
          </Anchor>
          .
        </Text>
      </li>
      <li>
        Hosted at{" "}
        <Anchor target="_blank" href="https://vercel.com">
          Vercel
        </Anchor>
        .
      </li>
      <li>
        Powered by{" "}
        <Anchor target="_blank" href="https://nextjs.org">
          Next.js
        </Anchor>
        .
      </li>
    </ul>
  </>
);

export default Page;
