import { addDisposableEventListener, disposeNode } from "@frank-mayer/magic";
import { analytics } from "./analytics";

// #region CookieStore

declare type cookieOptions = {
  domain?: string;
  expires?: number;
  name: string;
  path: string;
  sameSite: "lax"|"strict"|"none";
  secure: boolean;
  value: string;
};

declare interface CookieStore {
  onchange(event: Event) : void;

  /**
   * Gets a single cookie with the matching name.
   */
  get(name: string): Promise<cookieOptions>;

  /**
   * Gets all cookies with a matching name.
   */
  getAll(name: string): Promise<{ [key: string]: cookieOptions }>;

  /**
   * Gets all cookies with a matching options.
   */
  getAll(options: cookieOptions): Promise<{ [key: string]: cookieOptions }>;

  /**
   * Sets a cookie with the given name and value.
   */
  set(name: string, value: string): Promise<void>;

  /**
   * Sets a cookie with the given options.
   */
  set(options: cookieOptions): Promise<void>;

  /**
   * Deletes a cookie with a matching name.
   */
  delete(name: string): Promise<void>;

  /**
   * Deletes a cookie with a matching options.
   */
  delete(options: cookieOptions): Promise<void>;
}

declare const cookieStore: CookieStore | undefined;

// #endregion CookieStore

(async() => {
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
  addDisposableEventListener(allowButton, "click", () => {
    if (cookieStore) {
      analytics.app.automaticDataCollectionEnabled = true;
      cookieStore.set({
        domain: window.location.hostname,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 365,
        name: "allow-cookies",
        path: "/",
        sameSite: "lax",
        secure: true,
        value: "true",
      }).catch(console.error).finally(()=>{
        dialogEl.close();
        disposeNode(dialogEl);
      });
    } else {
      dialogEl.close();
      disposeNode(dialogEl);
    }
  });
  dialogEl.appendChild(allowButton);

  const disallowButton = document.createElement("button");
  disallowButton.innerText = "Nur notwendige";
  disallowButton.classList.add("disallow");
  addDisposableEventListener(disallowButton, "click", () => {
    if (cookieStore) {
      analytics.app.automaticDataCollectionEnabled = false;
      cookieStore.set({
        domain: window.location.hostname,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 365,
        name: "allow-cookies",
        path: "/",
        sameSite: "lax",
        secure: true,
        value: "false",
      }).catch(console.error).finally(()=>{
        dialogEl.close();
        disposeNode(dialogEl);
      });
    } else {
      dialogEl.close();
      disposeNode(dialogEl);
    }
  });
  dialogEl.appendChild(disallowButton);

  document.body.appendChild(dialogEl);

  dialogEl.showModal();

  dialogEl.addEventListener("close", () => {
    disposeNode(dialogEl);
  });
})();
