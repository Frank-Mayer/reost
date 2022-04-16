import "@frank-mayer/magic";
import type { RoutedEvent } from "photon-re";
import { DiscordWidget } from "./DiscordWidget";
import { ServerData } from "./ServerData";

const minecraftServerData = new ServerData("reost.de");
const discordWidget = new DiscordWidget("467053516066652160");

const motd = document.getElementById("motd");
if (motd) {
  minecraftServerData.setMotd(motd);
}

const contentEl = document.getElementById("content")!;

contentEl.addEventListener(
  "routed",
  (ev) => {
    const route = (ev as RoutedEvent).detail.route.join("/");

    document.title = `Reost – ${route.capitalize()}`;

    switch (route) {
      case "discord":
        discordWidget.generateHTML().then((html) => {
          contentEl.appendChild(html);
        });
        break;

      case "players":
        minecraftServerData.generatePlayerList().then((html) => {
          contentEl.appendChild(html);
        });
        break;
    }

    minecraftServerData.fillPlaceholders(contentEl);

    if (route !== "home") {
      contentEl.scrollIntoView({ behavior: "smooth" });
    }

    removeSplash();
  },
  {
    passive: true,
  }
);

const snapEl = document.getElementById("snap")!;

const updateSnapElState = () => {
  const scrollPercentage =
    snapEl.scrollTop / (snapEl.scrollHeight - snapEl.clientHeight);

  snapEl.style.setProperty(
    "--scroll-percentage",
    scrollPercentage.toPrecision(4)
  );

  contentEl.classList.toggle("readable", scrollPercentage > 0.5);
};

snapEl.addEventListener("scroll", updateSnapElState, {
  passive: true,
  capture: false,
});

setTimeout(updateSnapElState, 250);

const removeSplash = () => {
  const splashEl = document.getElementById("splash");
  if (splashEl) {
    splashEl.remove();
  }
};
removeSplash();
