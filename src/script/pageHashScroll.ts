/// <reference path="parallax.ts" />

const frame = new HTMLFrame(
  "#content",
  location.href.split("#")[0].split("?")[0].replace("/index.html", "/") +
    "content/"
);

const updatePage = async (hash: string, scroll = true) => {
  const doAnimation = location.hash != hash;

  if (doAnimation && mapContainer) {
    mapContainer.classList.add("down");
    await delay(250);
  }

  switch (hash) {
    case "#discord":
      await frame.inject("discord.html");
      break;
    case "#spieler":
      await frame.inject("players.html");
      break;
    case "#regeln":
      await frame.inject("rules.html");
      break;
    case "#team":
      await frame.inject("team.html");
      break;
    case "#shop":
      await frame.inject("shop.html");
      break;
    default:
      await frame.inject("home.html");
      break;
  }

  if (history.replaceState) {
    history.replaceState(null, document.title, hash);
  } else {
    location.hash = hash;
  }

  if (mapContainer) {
    mapContainer.classList.remove("down");
  }

  if (scroll) {
    window.scrollTo(0, document.body.scrollHeight);
  }
};

if (location.hash.length > 1) {
  updatePage(location.hash);
} else {
  window.scrollTo(0, 0);
  if (mapContainer) {
    mapContainer.classList.add("down");
    setTimeout(() => {
      updatePage("", false);
    }, 500);
  }
}
