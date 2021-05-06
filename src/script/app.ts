/// <reference path="dependencyRegistration.ts" />

const book = Yule.DI.inject<Book>(Book);
function updateBook(hash: string) {
  book.updatePage(hash);
}

setTimeout(() => {
  document.getElementById("loader")?.remove();
  document.body.parentElement?.classList.remove("loading");
  updateBook(location.hash);
}, Math.random() * 1000);
