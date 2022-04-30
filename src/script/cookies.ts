import { addDisposableEventListener, disposeNode } from "@frank-mayer/magic";
import { analytics } from "./analytics";

// #region CookieStore

declare type cookieOptions = {
  domain: string | null;
  expires: number | null;
  name: string;
  path: string;
  sameSite: string;
  secure: boolean;
  value: string;
};

declare interface CookieStore {
  onchange: (event: Event) => void;

  /**
   * Gets a single cookie with the matching name.
   */
  get: (name: string) => Promise<cookieOptions>;

  /**
   * Gets all cookies with a matching name.
   */
  getAll: {
    (name: string): Promise<{ [key: string]: cookieOptions }>;
    (options: cookieOptions): Promise<{ [key: string]: cookieOptions }>;
  };

  /**
   * Sets a cookie with the given name and value or options.
   */
  set: {
    (name: string, value: string): Promise<void>;
    (options: cookieOptions): Promise<void>;
  };

  /**
   * Deletes a cookie with a matching name or options.
   */
  delete: {
    (name: string): Promise<void>;
    (options: cookieOptions): Promise<void>;
  };
}

declare const cookieStore: CookieStore|undefined;

// #endregion CookieStore

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
