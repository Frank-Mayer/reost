/// <reference path="dependencyRegistration.ts" />

const book = Yule.DI.inject<Book>(Book);
function updateBook(hash: string) {
  book.updatePage(hash);
}
updateBook(location.hash);
