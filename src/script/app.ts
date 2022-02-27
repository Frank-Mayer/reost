import { Router, DomFrame } from "@frank-mayer/photon";
import { capitalize } from "@frank-mayer/magic";
import { DiscordWidget } from "./DiscordWidget";

const contentEl = document.getElementById("content")!;

export const router = new Router({
  frame: new DomFrame({ element: contentEl }),
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

  if (ev.value !== "home") {
    contentEl.scrollIntoView({ behavior: "smooth" });
  }

  const splashEl = document.getElementById("splash");
  if (splashEl) {
    splashEl.remove();
  }
});

const snapEl = document.getElementById("snap")!;
snapEl.addEventListener(
  "scroll",
  () => {
    const scrollPercentage =
      snapEl.scrollTop / (snapEl.scrollHeight - snapEl.clientHeight);

    snapEl.style.setProperty(
      "--scroll-percentage",
      scrollPercentage.toPrecision(4)
    );

    contentEl.style.overflow = scrollPercentage > 0.5 ? "auto" : "hidden";
  },
  {
    passive: true,
    capture: false,
  }
);
