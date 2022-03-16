import { Router, DomFrame } from "@frank-mayer/photon";
import { capitalize } from "@frank-mayer/magic";
import { DiscordWidget } from "./DiscordWidget";
import { ServerData } from "./ServerData";

const minecraftServerData = new ServerData("reost.de");
const discordWidget = new DiscordWidget("467053516066652160");

const motd = document.getElementById("motd");
if (motd) {
  minecraftServerData.setMotd(motd);
}

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
  switch (ev.value) {
    case "discord":
      discordWidget.generateHTML().then((html) => {
        router.element.appendChild(html);
      });
      break;

    case "players":
      minecraftServerData.generatePlayerList().then((html) => {
        router.element.appendChild(html);
      });
      break;
  }

  minecraftServerData.fillPlaceholders(router.element);

  if (ev.value !== "home") {
    contentEl.scrollIntoView({ behavior: "smooth" });
  }

  const splashEl = document.getElementById("splash");
  if (splashEl) {
    splashEl.remove();
  }
});

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
