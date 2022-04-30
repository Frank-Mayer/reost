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

declare const cookieStore: CookieStore;

export { cookieStore };
