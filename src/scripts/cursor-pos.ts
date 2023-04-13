// track normalized cursor position relative to top center and pass it to css

window.addEventListener("mousemove", (ev: MouseEvent) => {
    const x = ev.clientX;
    const y = ev.clientY;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2;
    const dx = x - cx;
    const dy = y - cy;
    const nx = dx / cx;
    const ny = dy / cy;
    document.documentElement.style.setProperty("--cursor-x", nx.toString());
    document.documentElement.style.setProperty("--cursor-y", ny.toString());
});
