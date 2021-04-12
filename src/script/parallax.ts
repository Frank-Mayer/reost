const mapContainer = document.getElementById("mapContainer");
const title = document.getElementById("title");

if (mapContainer && title) {
  const onScroll = () => {
    const scrollYOffset = window.pageYOffset / window.innerHeight;

    const titleTranslate = scrollYOffset * 250;

    const mapAngle = Math.pow(0.9 - scrollYOffset, 2) * 100;
    const mapTranslate =
      Math.pow(1.125 * (2 * scrollYOffset) - 1, 2) * 500 + 128;

    for (let i = 0; i < title.childElementCount; i++) {
      (<HTMLElement>(
        title.children[i]
      )).style.transform = `translateY(${titleTranslate}px)`;
    }
    mapContainer.style.setProperty("--map-angle", `${mapAngle}deg`);
    mapContainer.style.setProperty("--map-translate", `${mapTranslate}px`);
  };

  onScroll();

  window.addEventListener("scroll", onScroll);
}
