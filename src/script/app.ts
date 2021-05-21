/// <reference path="dependencyRegistration.ts" />

const book = Yule.DI.inject<Book>(Book);
function updateBook(hash: string, scroll = true) {
  book.updatePage(hash, scroll);
}

setTimeout(() => {
  document.getElementById("loader")?.remove();
  document.body.parentElement?.classList.remove("loading");
  updateBook(location.hash, false);
}, 450 + Math.random() * 750);
