/// <reference path="root.ts" />

class App {
  private bookContent: Yule.DomFrame;

  constructor() {
    this.bookContent = new Yule.DomFrame("#content");

    Yule.DI.registerSingle(new DataWriter());

    Yule.DI.registerSingle(
      new Book(
        document.getElementById("bookContainerContainer")!,
        this.bookContent,
        Yule.DI.inject(DataWriter)
      )
    );
  }
}

var updateBook: Function;

// Boot the application async
setTimeout(() => {
  root.inject("app.html").then(() => {
    new App();

    const book = Yule.DI.inject(Book);

    updateBook = (newPage: string, scroll = true) => {
      book.setPage(newPage, scroll);
    };

    // Remove the splash screen
    const splash = document.getElementById("splash");
    if (splash) {
      splash.remove();
    }
  });
}, 500);
