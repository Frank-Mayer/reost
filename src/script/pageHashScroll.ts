const updatePage = () => {
  setTimeout(() => {
    let element: HTMLElement | null = null;

    switch (location.hash) {
      case "#spieler":
        element = document.getElementById("players");
        break;
      case "#regeln":
        element = document.getElementById("rules");
        break;
      case "#team":
        element = document.getElementById("team");
        break;
      default:
        element = document.getElementById("landingPage");
        break;
    }

    if (element) {
      element.scrollIntoView({
        block: "start",
        inline: "start",
      });
    }
  }, 250);
};

updatePage();
