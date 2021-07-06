class Book extends Yule.Router {
  private readonly dataWriter: DataWriter;

  private scrollPos: number;
  private touchStartPos: number;

  private readonly bookContainer: HTMLElement;

  constructor(
    bookContainer: HTMLElement,
    frame: Yule.DomFrame,
    dataWriter: DataWriter
  ) {
    super({
      frame,
      sitemap: new Set([
        "discord",
        "home",
        "map",
        "players",
        "rules",
        "shop",
        "team",
      ]),
      homeSite: "home",
      homeAsEmpty: true,
      setWindowTitle: (newPage) => {
        return `Reost - ${newPage}`;
      },
    });
    this.bookContainer = bookContainer;

    this.touchStartPos = -1;
    this.scrollPos = 0;

    this.dataWriter = dataWriter;

    window.addEventListener("touchstart", (ev) => this.onTouchStart(ev));
    window.addEventListener("touchmove", (ev) => this.onTouchMove(ev));
    window.addEventListener("wheel", (ev) => this.onWheel(ev));
    window.addEventListener("keydown", (ev) => this.onKeyDown(ev));
  }

  protected getCurrentSubPageName(): string {
    return location.pathname.substr(1);
  }

  protected pageTitleToPath(newPage: string): string {
    return `content/${newPage}.html`;
  }

  async setPage(newPage: string, scroll: boolean, doPushState?: boolean) {
    const doAnimation = this.lastLocation != newPage;

    if (doAnimation && this.bookContainer) {
      this.bookContainer.classList.add("down");
      await Yule.delay(250);
    }

    await super.setPage(newPage, doPushState);

    if (this.bookContainer && this.bookContainer.classList.contains("down")) {
      this.bookContainer.classList.remove("down");
      await Yule.delay(250);
    }

    if (scroll) {
      this.scrollDown(true, true);
    }
  }

  protected onInject(newPage: string) {
    switch (newPage) {
      case "discord":
        this.dataWriter.discordOnlineList();
        break;
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
      this.bookContainer.classList.add("tilted");
    } else {
      this.bookContainer.classList.remove("tilted");
    }
  }
}
