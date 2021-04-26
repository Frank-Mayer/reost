class Parallax {
  mapContainer: HTMLElement;
  title: HTMLElement;

  constructor(mapContainer: HTMLElement, title: HTMLElement) {
    this.mapContainer = mapContainer;
    this.title = title;
    this.onScroll();
    window.addEventListener("scroll", this.onScroll);
  }

  onScroll() {
    const scrollYOffset = window.pageYOffset / window.innerHeight;

    const titleTranslate = scrollYOffset * 250;

    const mapAngle = Math.pow(0.9 - scrollYOffset, 2) * 100;
    const mapTranslate =
      Math.pow(1.125 * (2 * scrollYOffset) - 1, 2) * 500 + 128;

    for (let i = 0; i < this.title!.childElementCount; i++) {
      (<HTMLElement>(
        this.title!.children[i]
      )).style.transform = `translateY(${titleTranslate}px)`;
    }
    this.mapContainer!.style.setProperty("--map-angle", `${mapAngle}deg`);
    this.mapContainer!.style.setProperty(
      "--map-translate",
      `${mapTranslate}px`
    );
  }
}
