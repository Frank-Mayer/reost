/// <reference path="Book.ts" />
/// <reference path="Parallax.ts" />
/// <reference path="DataWriter.ts" />

const mapContainer = document.getElementById("mapContainer");
const title = document.getElementById("title");

if (!mapContainer) {
  throw new Error("mapContainer not found on Dom");
}

if (!title) {
  throw new Error("title not found on Dom");
}

Yule.DI.registerSingle(new Parallax(mapContainer, title));

Yule.DI.registerSingle(new DataWriter());

Yule.DI.registerSingle(
  new Yule.DomFrame(
    "#content",
    location.href.split("#")[0].split("?")[0].replace("/index.html", "/") +
      "content/"
  )
);

Yule.DI.registerSingle(
  new Book(
    mapContainer,
    Yule.DI.inject(Yule.DomFrame),
    Yule.DI.inject(DataWriter)
  )
);
