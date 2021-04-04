const steve = document.getElementById("steve");
const motd = document.getElementById("motd");
let prePos = window.pageYOffset;

if (steve && motd) {
  const onScroll = () => {
    const scrollYOffset = window.pageYOffset;
    const velocity = prePos - scrollYOffset;
    prePos = scrollYOffset;

    motd.style.transform = `translateY(calc(50vh + ${Math.round(
      scrollYOffset / 5
    )}px))`;

    // steve.style.transform = `translateY(-${Math.round(scrollYOffset / 50)}px)`;

    steve.style.setProperty(
      "--velocity",
      Math.min(50, Math.max(-30, velocity / 2)).toString()
    );
  };

  onScroll();

  window.addEventListener("scroll", onScroll);
}
