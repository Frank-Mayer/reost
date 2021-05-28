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
    function httpGet(url: string, cached?: boolean): Promise<string>;
    function httpGetParsed<T>(url: string, cached?: boolean): Promise<T>;
}
declare namespace Yule {
    class DomFrame {
        private readonly element;
        private readonly basePath;
        private current?;
        constructor(selector: string, basePath?: string);
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
    class ImmutableList<T> {
        protected readonly bucket: Array<T>;
        readonly length: number;
        constructor(...value: Array<Array<T> | ImmutableList<T> | T>);
        [Symbol.iterator](): T[];
        value(): Array<T>;
        plus(valueToAdd: Array<T> | ImmutableList<T> | T): ImmutableList<T>;
        forEach(callback: (element: T) => void): void;
        forEachAsync(callback: (element: T) => void): Promise<void>;
    }
}
declare namespace Yule {
    class indexedDB<T> {
        protected readonly dbName: string;
        protected readonly dbVersion: number;
        onupgradeneeded?: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any;
        constructor(dbName: string, version?: number, onupgradeneeded?: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any);
        get(id: string): Promise<T>;
        select(callback: (cursor: IDBCursorWithValue) => void): Promise<void>;
        delete(id: string): Promise<boolean>;
        set(id: string, value: T): Promise<void>;
        update<K extends keyof T, V extends T[K]>(id: string, key: K, newValue: V): Promise<void>;
    }
}
declare namespace Yule {
    type LinkedListNode<T> = [LinkedListNode<T> | undefined, T, LinkedListNode<T> | undefined];
    export class LinkedList<T> {
        protected head: LinkedListNode<T> | undefined;
        protected tail: LinkedListNode<T> | undefined;
        length: number;
        constructor(content?: Array<T>);
        private LinkedListNode;
        static of<T>(value: T): LinkedList<T>;
        [Symbol.iterator](): T[];
        append(value: T): void;
        prepend(value: T): void;
        deleteHead(): T | undefined;
        deleteTail(): T | undefined;
        splice(start: number, deleteCount?: number): boolean;
        clear(): void;
        indexOf(value: T): number;
        at(index: number): T | undefined;
        includes(value: T): boolean;
        search(value: T): LinkedListNode<T> | undefined;
        isEmpty(): boolean;
        forEach(callback: (value: T, prev: LinkedListNode<T> | undefined, next: LinkedListNode<T> | undefined, index: number) => void): void;
        toArray(): Array<T>;
        toString(): string;
    }
    export {};
}
declare namespace Yule {
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
declare function sealed(constructor: Function): void;
declare namespace Yule {
    const DI: {
        registerSingle<T extends object>(obj: T, C?: string | Class<T> | undefined): T;
        registerFactory<T_1 extends object>(constructor: () => T_1, C: string | Class<T_1>): () => T_1;
        inject<T_2 extends object>(C: string | Class<T_2>): T_2;
    };
}
declare namespace Yule {
    function ESSupport(ecmaScriptVersion: "ES5" | "ES6" | "ES2015" | "ES2016" | "ES2017" | "ES2018" | "ES2019" | "ES2020"): boolean;
}
declare namespace Yule {
    function as<T extends object, R>(target: T, callback: (this: T) => R): R;
}
declare namespace Yule {
    function copy(text: string): Promise<void>;
}
declare namespace Yule {
    function delay(ms: number): Promise<void>;
    function retriggerableDelay(delayId: string, ms: number, callback: Function): void;
}
declare namespace Yule {
    function doOnce(callback: Function, id?: string): any;
}
declare namespace Yule {
    function range(head: number, tail: number, stepSize?: number): number[];
}
declare namespace Yule {
    function require(src: string): Promise<Event | void>;
}
