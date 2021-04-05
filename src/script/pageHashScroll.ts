const frame = new HTMLFrame(
  "#content",
  location.href.replace(location.hash, "").replace("/index.html", "/") +
    "content/"
);

const updatePage = (hash: string) => {
  let scroll = false;

  switch (hash) {
    case "#spieler":
      frame.inject("players.html");
      scroll = true;
      break;
    case "#regeln":
      frame.inject("rules.html");
      scroll = true;
      break;
    case "#team":
      frame.inject("team.html");
      scroll = true;
      break;
    default:
      frame.inject("home.html");
      break;
  }

  if (history.pushState) {
    history.pushState(null, document.title, hash);
  } else {
    location.hash = hash;
  }

  if (scroll) {
    frame.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }
};

updatePage(location.hash);
