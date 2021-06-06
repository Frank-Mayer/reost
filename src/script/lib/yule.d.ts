declare type Class<T extends object> = new (...arguments: any[]) => T;

interface Array<T> {
  /**
   * Fisher-Yates Shuffle
   */
  shuffle: () => Array<T>;

  clear: () => Array<T>;

  searchFor: (comparator: (x: T) => boolean) => T;
}

interface Math {
  /**
   * Bitwise rotate a 32-bit number to the left.
   */
  bitRotateLeft: (num: number, cnt: number) => number;

  /**
   * @returns >=min & <=max
   * @param value The value to be clamped
   * @param min The lower bound of the result
   * @param max The upper bound of the result
   */
  clamp: <T extends number | bigint>(value: T, min: T, max: T) => T;

  /**
   * Calculates the Nth Fibonacci
   * @param n
   * @returns fib
   */
  fibonacci: (n: number) => bigint;

  /**
   * Euclidean algorithm
   */
  gcd: (a: number, b: number) => number;

  /**
   * Checks if a number is prime
   * @param n Number to check
   * @returns TRUE if prime; otherwise FALSE
   */
  isPrime: (n: bigint) => boolean;

  /**
   * Calculates the Nth prime number
   * @param n How many prime
   * @returns Prime
   */
  nthPrime: (n: number) => bigint;

  /**
   * Calculates the next prime number
   * @param start Number to start from
   * @returns Prime
   */
  nextPrime: (n: bigint) => bigint;

  /**
   * Round to a specified precition
   */
  roundOff: (x: number, precision: number) => number;

  /**
   * Add integers, wrapping at 2^32.
   * This uses 16-bit operations internally to work around bugs in interpreters.
   *
   * @param a First integer
   * @param b Second integer
   * @returns Sum
   */
  safeAdd: (a: number, b: number) => number;

  /**
   * Square root of a positive bigint
   */
  sqrtBigInt: (value: bigint) => bigint;
}

declare namespace Yule {
    class CircularBuffer<T> {
        private readonly buffer;
        cursor: number;
        readonly size: number;
        constructor(size?: number, defaultValues?: Array<T>);
        push(value: T): void;
        pop(): void;
    }
}
declare namespace Yule {
    /**
     *Sends an asynchronous http-get request to a given url
     * @param url Url to send the request to
     * @param cached Whether you want the response to be cached or not
     * @deprecated use fetch
     */
    function httpGet(url: string, cached?: boolean): Promise<string>;
    /**
     *Sends an asynchronous http-get request to a given url
     * @param url Url to send the request to
     * @param cached Whether you want the response to be cached or not
     * @returns Parsed JSON Object from request
     * @deprecated use fetch
     */
    function httpGetParsed<T>(url: string, cached?: boolean): Promise<T>;
}
declare namespace Yule {
    class DomFrame {
        private readonly element;
        private readonly basePath;
        private current?;
        private requestOptions;
        constructor(selector: string, basePath?: string);
        setRequestOptions(newOptions: RequestInit): void;
        inject(content: string | Array<HTMLElement>): Promise<boolean>;
        clear(): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(): Animation[];
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        getStyle(): CSSStyleDeclaration;
        getClassList(): DOMTokenList;
    }
}
declare namespace Yule {
    /**
     * Readonly List
     */
    class ImmutableList<T> {
        protected readonly bucket: Array<T>;
        readonly length: number;
        constructor(...value: Array<Array<T> | ImmutableList<T> | T>);
        [Symbol.iterator](): T[];
        /**
         * @returns a copy of the values.
         */
        value(): Array<T>;
        /**
         * @returns a concatination of its values plus a given dataset.
         */
        plus(valueToAdd: Array<T> | ImmutableList<T> | T): ImmutableList<T>;
        /**
         * Iterates through the list using a given callback function.
         */
        forEach(callback: (element: T) => void): void;
        /**
         * Iterates through the list asynchronously using a given callback function.
         */
        forEachAsync(callback: (element: T) => void): Promise<void>;
    }
}
declare namespace Yule {
    /**
     * Promise based wrapper around Browsers IndexedDB
     */
    class indexedDB<T> {
        protected readonly dbName: string;
        protected readonly dbVersion: number;
        onupgradeneeded?: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any;
        constructor(dbName: string, version?: number, onupgradeneeded?: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any);
        /**
         * Gets the value at a given index.
         */
        get(id: string): Promise<T>;
        /**
         * Iterates through the table using a given callback function.
         */
        select(callback: (cursor: IDBCursorWithValue) => void): Promise<void>;
        /**
         * Tries to delete a data at a given id.
         * @returns true if successful and false if not.
         */
        delete(id: string): Promise<boolean>;
        /**
         * Sets the value at a given id.
         */
        set(id: string, value: T): Promise<void>;
        /**
         * Updates the value of a given key and id in the table.
         * @param id of the table
         * @param key of the value object
         * @param newValue of the object at the given key
         */
        update<K extends keyof T, V extends T[K]>(id: string, key: K, newValue: V): Promise<void>;
    }
}
declare namespace Yule {
    type LinkedListNode<T> = [
        LinkedListNode<T> | undefined,
        T,
        LinkedListNode<T> | undefined
    ];
    /**
     * Represents a doubly linked list
     */
    export class LinkedList<T> {
        protected head: LinkedListNode<T> | undefined;
        protected tail: LinkedListNode<T> | undefined;
        length: number;
        constructor(content?: Array<T>);
        private LinkedListNode;
        /**
         * Initializes a new instance of the LinkedList class that contains a given value.
         */
        static of<T>(value: T): LinkedList<T>;
        [Symbol.iterator](): T[];
        /**
         * Adds a new node containing the specified value at the end of the LinkedList.
         */
        append(value: T): void;
        /**
         * Adds a new node containing the specified value at the start of the LinkedList.
         */
        prepend(value: T): void;
        /**
         * Deletes the head node, node before becomes new head.
         */
        deleteHead(): T | undefined;
        /**
         * Deletes the tail node, node before becomes new tail.
         */
        deleteTail(): T | undefined;
        /**
         * Cuts out a specific area of the LinkedList with a given index and the amount of nodes to delete.
         * @param start index to start
         * @param deleteCount
         * @returns true if the action was possible, false if not.
         */
        splice(start: number, deleteCount?: number): boolean;
        /**
         * Removes all nodes from the LinkedList.
         */
        clear(): void;
        /**
         * Finds the first node that contains the specified value.
         */
        indexOf(value: T): number;
        /**
         * Finds the node at the given index
         */
        at(index: number): T | undefined;
        /**
         * Determines whether a value is in the LinkedList
         */
        includes(value: T): boolean;
        /**
         * Finds the first node that contains the specified value and returns a reference to it.
         */
        search(value: T): LinkedListNode<T> | undefined;
        /**
         * Checks whether the List contains nodes or not.
         */
        isEmpty(): boolean;
        /**
         * Iterates through the list using a given callback function.
         */
        forEach(callback: (value: T, prev: LinkedListNode<T> | undefined, next: LinkedListNode<T> | undefined, index: number) => void): void;
        /**
         * @returns a new Array using the LinkedLists nodes.
         */
        toArray(): Array<T>;
        toString(): string;
    }
    export {};
}
declare namespace Yule {
    /**
     * This class represents a string-like object whose value is a mutable sequence of characters.
     */
    class StringBuilder {
        private bucket;
        length: number;
        constructor(value?: string | undefined);
        [Symbol.iterator](): string[];
        toString(): string;
        append(value: string): void;
        appendLine(value: string): void;
        clear(): void;
        replace(searchValue: string | RegExp, replaceValue: string): void;
        replaceAll(searchValue: string | RegExp, replaceValue: string): void;
        private countLength;
    }
}
declare namespace Yule {
    abstract class SubPageManager {
        /**
         * The sub-page Frame.
         */
        protected readonly frame: Yule.DomFrame;
        /**
         * Currently loaded path on the Frame.
         */
        protected lastLocation: string;
        protected sitemap: Array<string>;
        protected fallbackSite: string;
        protected siteNameClassPushElement: HTMLElement;
        constructor(frame: Yule.DomFrame, sitemap: Array<string>, homeSite: string, fallbackSite?: string, siteNameClassPushElement?: HTMLElement);
        /**
         * Gets the name of the page that should be displayed now
         */
        protected abstract getCurrentSubPageName(): string;
        /**
         * Converts a given page page title into a path
         */
        protected abstract pageTitleToPath(newPage: string): string;
        /**
         * Load special sub-page content if needed.
         */
        protected abstract specialContent(newPage: string): void;
        /**
         * Injects the content of a given sub-page into the sub-page Frame.
         * @param newPage has to be listed in the sitemap.
         */
        setPage(newPage: string, doPushState?: boolean): Promise<void>;
        protected onPopState(ev: PopStateEvent): void;
        /**
         * Push a new location to the url without reloading the page.
         */
        protected pushState(newLocation: string): void;
    }
}
declare function sealed(constructor: Function): void;
declare namespace Yule {
    const DI: {
        getInheritanceChain(c: Object): Array<string>;
        registerSingle<T extends Object>(obj: T): T;
        registerFactory<T_1 extends Object>(constructionIntroduction: () => T_1): () => T_1;
        inject<T_2 extends Object>(C: Function | Class<T_2>): T_2;
        registerDependencies(callback: (get: <T_3 extends Object>(C: Class<T_3>) => T_3, single: <T_4 extends Object>(obj: T_4) => T_4, factory: <T_5 extends Object>(constructionIntroduction: () => T_5) => () => T_5) => void): void;
    };
}
declare namespace Yule {
    function ESSupport(ecmaScriptVersion: "ES5" | "ES6" | "ES2015" | "ES2016" | "ES2017" | "ES2018" | "ES2019" | "ES2020"): boolean;
}
declare namespace Yule {
    function as<T extends object, R>(target: T, callback: (this: T) => R): R;
}
declare namespace Yule {
    /**
     * returns true if the window is inside a frame, false if it is not.
     */
    function checkFrame(w?: Window): boolean;
}
declare namespace Yule {
    function copy(text: string): Promise<void>;
}
declare namespace Yule {
    function delay(ms: number): Promise<void>;
    function retriggerableDelay(delayId: string, ms: number, callback: Function): void;
}
declare namespace Yule {
    /**
     * The doOnce function executes a callback only one time
     */
    function doOnce(callback: Function, id?: string): any;
}
declare namespace Yule {
    function range(head: number, tail: number, stepSize?: number): number[];
}
declare namespace Yule {
    function require(src: string): Promise<Event | void>;
}
