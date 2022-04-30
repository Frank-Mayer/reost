import { cookieStore } from "./lib/CookieStore";

import { addDisposableEventListener, disposeNode } from "@frank-mayer/magic";
import { analytics } from "./analytics";

(async()=>{
  if (cookieStore) {
    const allowCookies = await cookieStore.get("allow-cookies");

    if (allowCookies?.value === "true" || allowCookies?.value === "false") {
      return;
    }
  }

  const dialogEl = document.createElement("dialog");

  const textEl = document.createElement("p");
  textEl.innerText = [
    "Wir nutzen Cookies auf unserer Website.",
    "Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.",
  ].join("\n");
  textEl.classList.add("text");
  dialogEl.appendChild(textEl);

  const allowButton = document.createElement("button");
  allowButton.innerText = "Alle erlauben";
  allowButton.classList.add("allow");
  addDisposableEventListener(allowButton, "click", async() => {
    if (cookieStore) {
      analytics.app.automaticDataCollectionEnabled = true;
      await cookieStore.set("allow-cookies", "true");
    }
    dialogEl.close();
    disposeNode(dialogEl);
  });
  dialogEl.appendChild(allowButton);

  const disallowButton = document.createElement("button");
  disallowButton.innerText = "Nur notwendige";
  disallowButton.classList.add("disallow");
  addDisposableEventListener(disallowButton, "click", async() => {
    if (cookieStore) {
      analytics.app.automaticDataCollectionEnabled = false;
      await cookieStore.set("allow-cookies", "false");
    }
    dialogEl.close();
    disposeNode(dialogEl);
  });
  dialogEl.appendChild(disallowButton);

  document.body.appendChild(dialogEl);

  dialogEl.showModal();

  dialogEl.addEventListener("close", ()=>{
    disposeNode(dialogEl);
  });
}
)();
