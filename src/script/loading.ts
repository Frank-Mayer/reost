setTimeout(() => {
  document.getElementById("loader")?.remove();
  document.body.parentElement?.classList.remove("loading");
}, 1000);
