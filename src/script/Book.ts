class Book {
  private bookContainer: HTMLElement;
  private bookContainerContainer: HTMLElement;
  private frame: Yule.DomFrame;

  private hash = location.hash;

  private dataWriter: DataWriter;

  private scrollY = 0;
  private scrollPos = 0;

  constructor(
    bookContainer: HTMLElement,
    frame: Yule.DomFrame,
    dataWriter: DataWriter
  ) {
    this.bookContainer = bookContainer;
    this.bookContainerContainer = this.bookContainer.parentElement!;
    this.frame = frame;
    this.dataWriter = dataWriter;
    window.addEventListener("scroll", () => this.onScroll());
  }

  async updatePage(hash: string, scroll: boolean) {
    const doAnimation = this.hash != hash;

    if (doAnimation) {
      this.bookContainerContainer.classList.add("down");
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

    this.bookContainerContainer.classList.remove("down");

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

    const className = hash.replace("#", "");
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.className = className || "home";
    }
  }

  private onScroll() {
    const newScrollY = document.documentElement.scrollTop;

    if (newScrollY > this.scrollY && this.scrollPos != 1) {
      this.scrollPos = 1;
      this.updateBookContainerAngle();
      window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: document.body.scrollHeight,
      });
    } else if (newScrollY < this.scrollY && this.scrollPos != 0) {
      this.scrollPos = 0;
      this.updateBookContainerAngle();
      window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
    }

    this.scrollY = newScrollY;
  }

  private updateBookContainerAngle() {
    if (this.scrollPos == 0) {
      this.bookContainerContainer.classList.add("tilted");
    } else {
      this.bookContainerContainer.classList.remove("tilted");
    }
  }
}
