class Book {
  private mapContainer: HTMLElement;
  private frame: Yule.DomFrame;

  private hash = location.hash;

  private dataWriter: DataWriter;

  constructor(
    mapContainer: HTMLElement,
    frame: Yule.DomFrame,
    dataWriter: DataWriter
  ) {
    this.mapContainer = mapContainer;
    this.frame = frame;
    this.dataWriter = dataWriter;
  }

  async updatePage(hash: string, scroll: boolean) {
    const doAnimation = this.hash != hash;

    if (doAnimation) {
      this.mapContainer.classList.add("down");
      await Yule.delay(250);
    }

    switch (hash) {
      case "#discord":
        await this.frame.inject("discord.html");
        await this.dataWriter.discordOnlineList();
        break;
      case "#spieler":
        await this.frame.inject("players.html");
        break;
      case "#regeln":
        await this.frame.inject("rules.html");
        break;
      case "#team":
        await this.frame.inject("team.html");
        break;
      case "#shop":
        await this.frame.inject("shop.html");
        break;
      case "#karte":
        await this.frame.inject("map.html");
        break;
      case "":
        await this.frame.inject("home.html");
        window.scrollTo(0, 0);
        return;
      default:
        await this.frame.inject("home.html");
        break;
    }

    this.replaceHash(hash);

    this.mapContainer.classList.remove("down");

    if (scroll) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  private replaceHash(hash: string) {
    if (history.replaceState) {
      history.replaceState(null, document.title, hash);
    } else {
      location.hash = hash;
    }
    this.hash = hash;
  }
}
