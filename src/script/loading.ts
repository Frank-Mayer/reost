setTimeout(() => {
  document.getElementById("loader")?.remove();
  document.body.parentElement?.classList.remove("loading");
}, 750 + Math.random() * 500);
