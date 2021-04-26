setTimeout(() => {
  document.getElementById("loader")?.remove();
  document.body.parentElement?.classList.remove("loading");
}, Math.random() * 100);
