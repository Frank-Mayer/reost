/// <reference path="../../../../Rocket.ts/src/Extensions/Math/Math.d.ts" />
/// <reference path="../../../../Rocket.ts/src/Extensions/Array/Array.d.ts" />
/**
 * Basic implementation of the Diffie-Hellman key exchange
 */
declare class DiffieHellman {
  private privateKey;
  private prime;
  private generator;
  private sharedKey?;
  constructor(prime?: bigint, generator?: bigint);
  getPublicKey(): bigint;
  getPrime(): bigint;
  getGenerator(): bigint;
  setPartnersPublicKey(key: bigint): void;
  getSharedKey(): bigint | undefined;
}
interface String {
  hash: () => number;
}
/**
 * The SortedList is a self sorting typed Array of objects that can be accessed by index
 */
declare class SortedList<T> {
  private list;
  private hasChangedSinceLastSort;
  length: number;
  key: keyof T | undefined;
  constructor(key?: keyof T, template?: Array<T>);
  [Symbol.iterator](): IterableIterator<T>;
  add(value: T): number;
  remove(value: T): boolean;
  pop(amount: number): Set<T>;
  shift(amount: number): Set<T>;
  private getSortingValueOf;
  sort(): void;
  getAt(index: number): T | null;
  indexOf(value: T): number;
  includes(value: T): boolean;
  forEach(callback: (Element: T) => void): void;
}
/**
 * Represents a collection of key/value pairs that are organized based on the hash code of the key.
 */
declare class HashMap {
  private bucket;
  length: number;
  private hashList;
  constructor();
  private hash;
  /**
   * Adds an element with the specified key and value into the Hashtable.
   * @param key
   * @param value
   */
  set(key: any, value: any): void;
  /**
   * Removes the element with the specified key from the HashMap.
   * @param key
   * @returns true if the key was present in the HashMap, false if it wann't.
   */
  delete(key: any): boolean;
  /**
   * Removes the element with the specified key from the HashMap.
   * @param key
   * @returns the removed item or undefined if not found.
   */
  pop(key: any): any;
  /**
   * Search for the value at the given key and returns it.
   * @param key
   * @returns the value at the given key or undefined if not found.
   */
  get(key: any): any;
  /**
   * Determines whether the HashMap contains a specific key.
   * @returns true if the key was found, false if not.
   */
  has(key: any): boolean;
  /**
   * Converts the HashMap into a readable, JSON-like string format.
   */
  toString(): string;
  /**
   * Iterate through the HashMap with a given callback function.
   */
  forEach(callback: (el: any[2], map: any[][][]) => void): void;
}
declare const __httpGetCache: HashMap;
/**
 *Sends an asynchronous http-get request to a given url
 * @param url Url to send the request to
 * @param cached Whether you want the response to be cached or not
 */
declare function httpGet(url: string, cached?: boolean): Promise<string>;
/**
 *Sends an asynchronous http-get request to a given url
 * @param url Url to send the request to
 * @param cached Whether you want the response to be cached or not
 * @returns Parsed JSON Object from request
 */
declare function httpGetParsed<T>(url: string, cached?: boolean): Promise<T>;
declare class HTMLFrame {
  private readonly element;
  private readonly basePath;
  private current?;
  constructor(selector: string, basePath?: string);
  inject(path: string): Promise<boolean>;
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
  getBoundingClientRect(): DOMRect;
  getClientRects(): DOMRectList;
  animate(
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions
  ): Animation;
  getAnimations(): Animation[];
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  getStyle(): CSSStyleDeclaration;
  getClassList(): DOMTokenList;
}
/**
 * Data, stored in a 2D Matrix, indexed by the hash of the coordinates.
 */
declare class HashMatrix<R extends any, C extends any, T extends any> {
  private bucket;
  constructor();
  [Symbol.iterator](): () => IterableIterator<T>;
  /**
   * Gets the full row at the given index in an Array or undefined if the row doesn't exist.
   */
  getRow(index: R): Array<T> | undefined;
  /**
   * Gets the full column at the given index in an Array or undefined if the column doesn't exist.
   */
  getColumn(index: C): Array<T> | undefined;
  /**
   * Get the cell value at a specified location.
   */
  getCell(row: R, column: C): T | null;
  /**
   * Set the cell value at a specified location.
   */
  setCell(row: R, column: C, value: T): void;
}
/**
 * Readonly List
 */
declare class ImmutableList<T> {
  private readonly bucket;
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
   * Iterates asynchronously through the list using a given callback function.
   */
  forEachAsync(callback: (element: T) => void): Promise<void>;
}
/**
 * Promise based wrapper around Browsers IndexedDB
 */
declare class IDB<T> {
  protected readonly dbName: string;
  protected readonly dbVersion: number;
  constructor(dbName: string, version?: number);
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
  update<K extends keyof T, V extends T[K]>(
    id: string,
    key: K,
    newValue: V
  ): Promise<void>;
}
declare type LinkedListNode<T> = [
  LinkedListNode<T> | undefined,
  T,
  LinkedListNode<T> | undefined
];
/**
 * Represents a doubly linked list
 */
declare class LinkedList<T> {
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
  forEach(
    callback: (
      value: T,
      prev: LinkedListNode<T> | undefined,
      next: LinkedListNode<T> | undefined,
      index: number
    ) => void
  ): void;
  /**
   * @returns a new Array using the LinkedLists nodes.
   */
  toArray(): Array<T>;
  toString(): string;
}
/**
 * Data, stored in a 2D Matrix, indexed by the coordinates
 */
declare class Matrix<T extends any> {
  private bucket;
  constructor();
  [Symbol.iterator](): {
    value: T;
    row: number;
    col: number;
  }[];
  /**
   * Returns the full row at the given index in an Array or undefined if the row doesn't exist.
   */
  getRow(index: number): Array<T> | undefined;
  /**
   * Returns the full column at the given index in an Array or undefined if the column doesn't exist.
   */
  getColumn(index: number): Array<T> | undefined;
  /**
   * Returns the cell at a specified location.
   */
  getCell(row: number, column: number): T | undefined;
  /**
   * Sets the cell at a specified location.
   */
  setCell(row: number, column: number, value: T): void;
}
/**
 * Represents a first-in, first-out collection of objects
 */
declare class Queue<T> {
  private storage;
  length: number;
  constructor();
  [Symbol.iterator](): T[];
  /**
   * Adds a value to the end of the Queue.
   */
  enqueue(element: T): void;
  /**
   * Removes and returns the item at the beginning of the Queue
   */
  dequeue(): T | undefined;
  /**
   * @returns the item at the given index of the Queue without removing it
   */
  peek(index?: number): T | undefined;
}
/**
 * Represents a last-in-first-out (LIFO) collection of instances of the same specified type
 */
declare class Stack<T> {
  private storage;
  length: number;
  constructor();
  push(item: T): void;
  pop(): T | undefined;
  peek(pos?: number): T | undefined;
}
/**
 * Represents a mutable string of characters
 */
declare class StringBuilder {
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
/**
 * Represents a typed List with a static length cap
 */
declare class Trace<T> {
  private bucket;
  private size;
  constructor(size?: number);
  [Symbol.iterator](): T[];
  /**
   * Add a value to the trace
   */
  add(value: T): void;
  /**
   *
   * @param index Position in storage, 0 is latest
   * @returns
   */
  peek(index: number): T;
  /**
   * @returns a copy of the stored values
   */
  get(): T[];
}
/**
 * @param enumerator Enum to display as HTMLSelectElement
 * @param handler Function to be called on user input
 */
declare function SelectFromEnum<
  E extends {
    [index: number]: string;
  }
>(
  enumerator: E,
  selected?: number,
  handler?: (ev: Event) => void
): HTMLSelectElement;
declare function bindInput<T extends HTMLInputElement | HTMLSelectElement>(
  el: T,
  callback: (value: string, el: T) => void,
  onCommit?: boolean
): void;
declare function dynamicCast<T>(Class: T, e: any): T | null;
declare function delay(ms: number): Promise<void>;
declare const __onceDoneList: Set<string>;
/**
 * The doOnce function executes a callback only one time
 * @param callback Function
 */
declare function doOnce(callback: Function, id?: string): any;
declare interface Map<K, V> {
  findKeyByValue(value: V): K;
}
declare function nullAllUndefined<T extends Object>(obj: T): T;
declare function parallel(
  ...promises: Array<Promise<any>>
): Promise<Array<any>>;
declare var require: (src: string) => Promise<Event | undefined>;
declare const __required: Set<string>;
declare const __retriggerableDelayCache: Map<string, number>;
declare function retriggerableDelay(
  delayId: string,
  ms: number,
  callback: Function
): void;
declare function swap<T extends object>(a: T, b: T, prop: keyof T): void;
declare function tsx<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  properties?: {
    [key: string]: string | boolean | number;
  }
): HTMLElementTagNameMap[T];
declare function when<T, C>(
  condition: C,
  ...cases: Array<{
    if: C | (() => C) | null;
    then: (() => T | null) | T;
  }>
): T | null;
