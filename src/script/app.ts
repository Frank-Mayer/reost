import { Router, DomFrame } from "@frank-mayer/photon";
import { capitalize } from "@frank-mayer/magic";
import { DiscordWidget } from "./DiscordWidget";

export const router = new Router({
  frame: new DomFrame({ element: document.getElementById("content")! }),
  sitemap: new Set([
    "home",
    "discord",
    "players",
    "rules",
    "team",
    "shop",
    "map",
  ]),
  fallbackSite: "home",
  homeSite: "home",
  homeAsEmpty: true,
  setWindowTitle: (newPage) => `Reost – ${capitalize(newPage)}`,
});

router.addEventListener("injected", (ev) => {
  if (ev.value === "discord") {
    const discordWidget = new DiscordWidget(
      "https://discord.com/api/guilds/467053516066652160/widget.json"
    );

    discordWidget.generateHTML().then((html) => {
      router.element.appendChild(html);
    });
  }
});

const snapEl = document.getElementById("snap")!;
snapEl.addEventListener("scroll", (ev) => {
  const scrollPercentage =
    snapEl.scrollTop / (snapEl.scrollHeight - snapEl.clientHeight);

  snapEl.style.setProperty(
    "--scroll-percentage",
    scrollPercentage.toPrecision(4)
  );
});
