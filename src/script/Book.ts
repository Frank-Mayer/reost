class Book {
  private bookContainer: HTMLElement;
  private bookContainerContainer: HTMLElement;
  private frame: Yule.DomFrame;
  private dataWriter: DataWriter;

  private hash: string;

  private scrollPos: number;
  private touchStartPos: number;

  constructor(
    bookContainer: HTMLElement,
    frame: Yule.DomFrame,
    dataWriter: DataWriter
  ) {
    this.bookContainer = bookContainer;
    this.bookContainerContainer = this.bookContainer.parentElement!;
    this.frame = frame;
    this.dataWriter = dataWriter;

    this.hash = location.hash;
    this.touchStartPos = -1;
    this.scrollPos = 0;

    window.addEventListener("touchstart", (ev) => this.onTouchStart(ev));
    window.addEventListener("touchmove", (ev) => this.onTouchMove(ev));
    window.addEventListener("wheel", (ev) => this.onWheel(ev));
    window.addEventListener("keydown", (ev) => this.onKeyDown(ev));
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
        this.scrollUp(false);
        return;
      default:
        await this.frame.inject("home.html");
        break;
    }

    this.replaceHash(hash);

    this.bookContainerContainer.classList.remove("down");

    if (scroll) {
      this.scrollDown(true, true);
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

  private onTouchStart(ev: TouchEvent) {
    this.touchStartPos = ev.touches[0].pageY;
  }

  private onTouchMove(ev: TouchEvent) {
    if (ev.touches.length == 1) {
      if (ev.touches[0].pageY < this.touchStartPos) {
        this.scrollDown();
      } else if (ev.touches[0].pageY > this.touchStartPos) {
        this.scrollUp();
      }
    }
  }

  private onWheel(ev: WheelEvent) {
    if (ev.deltaY > 0) {
      this.scrollDown();
    } else {
      this.scrollUp();
    }
  }

  private onKeyDown(ev: KeyboardEvent) {
    switch (ev.key) {
      case "ArrowUp":
      case "Home":
      case "PageUp":
        try {
          ev.preventDefault();
        } finally {
          this.scrollUp();
        }
        break;
      case "ArrowDown":
      case "End":
      case "PageDown":
      case "NextCandidate":
      case "PreviousCandidate":
        try {
          ev.preventDefault();
        } finally {
          this.scrollDown();
        }
        break;
    }
  }

  private scrollDown(smooth = true, force = false) {
    if (this.scrollPos != 1 || force) {
      this.scrollPos = 1;
      this.updateBookContainerAngle();
      window.scrollTo({
        behavior: smooth ? "smooth" : "auto",
        left: 0,
        top: document.body.scrollHeight,
      });
    }
  }

  private scrollUp(smooth = true, force = false) {
    if (this.scrollPos != 0 || force) {
      this.scrollPos = 0;
      this.updateBookContainerAngle();
      window.scrollTo({
        behavior: smooth ? "smooth" : "auto",
        left: 0,
        top: 0,
      });
    }
  }

  private updateBookContainerAngle() {
    if (this.scrollPos == 0) {
      this.bookContainerContainer.classList.add("tilted");
    } else {
      this.bookContainerContainer.classList.remove("tilted");
    }
  }
}
