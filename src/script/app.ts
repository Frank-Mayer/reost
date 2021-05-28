/// <reference path="root.ts" />

class App {
  private bookContent: Yule.DomFrame;
  // private book: Book;

  constructor() {
    this.bookContent = new Yule.DomFrame(
      "#content",
      location.href.split("#")[0].split("?")[0].replace("/index.html", "/") +
        "content/"
    );

    Yule.DI.registerSingle(new DataWriter());

    Yule.DI.registerSingle(
      new Book(
        document.getElementById("bookContainer")!,
        this.bookContent,
        Yule.DI.inject(DataWriter)
      )
    );
  }
}

var updateBook: Function;

// Boot the application
root.inject("app.html").then(() => {
  new App();
  const book = Yule.DI.inject(Book);
  updateBook = (hash: string, scroll = true) => {
    book.updatePage(hash, scroll);
  };
  updateBook(location.hash || "#", location.hash.length > 0);
  document.getElementById("splash")?.remove();
});
