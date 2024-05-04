import {Quote, Tag} from "../common/types";
import {makeAutoObservable} from "mobx";
import {QUOTABLE_STORE_QUOTE_DATA_TTL_IN_MS, QUOTABLE_STORE_TAGS_DATA_TTL_IN_MS} from "../config";

enum LocalStorageKeysEnum {
  QUOTABLE_STORE_QUOTE = 'QuotableStore.quoute',
  QUOTABLE_STORE_TAGS = 'QuotableStore.tags',
  QUOTABLE_STORE_QUOTE_DATA = 'QuotableStore.quote_data'
}

export interface QuotesData {
  tag: Tag['name'];
  quotes: Quote[];
}

export class QuotableStore {

  public constructor() {
    makeAutoObservable(this)

    const rawQuoute = localStorage.getItem(LocalStorageKeysEnum.QUOTABLE_STORE_QUOTE);

    if (rawQuoute !== null) {
      const { ttl, data } = JSON.parse(rawQuoute);

      if (Date.now() < ttl) {
        this._quote = data;
      }
    }

    const rawTags = localStorage.getItem(LocalStorageKeysEnum.QUOTABLE_STORE_TAGS);

    if (rawTags !== null) {
      const { ttl, data } = JSON.parse(rawTags);

      if (Date.now() < ttl) {
        this._tags = data;
      }
    }

    const rawQuotesByTag = localStorage.getItem(LocalStorageKeysEnum.QUOTABLE_STORE_QUOTE_DATA);

    if (rawQuotesByTag !== null) {
      const entries = JSON.parse(rawQuotesByTag);

      this.quotesByTag = new Map(entries);
    }
  }

  private _quote: Quote[] = [];
  private _tags: Tag[] = [];

  private quotesByTag = new Map<Tag['name'], Quote[]>();
  private _quotesByTagCursor: Quote[] | null = null;

  public get quote() {
    return this._quote;
  }

  public setQuote = (quote: Quote[]) => {
    this._quote = quote;

    localStorage.setItem(LocalStorageKeysEnum.QUOTABLE_STORE_QUOTE, JSON.stringify({
      ttl: Date.now() + QUOTABLE_STORE_QUOTE_DATA_TTL_IN_MS,
      data: quote
    }));
  }

  public get tags() {
    return this._tags;
  }

  public setTags = (tags: Tag[]) => {
    this._tags = tags;

    localStorage.setItem(LocalStorageKeysEnum.QUOTABLE_STORE_TAGS, JSON.stringify({
      ttl: Date.now() + QUOTABLE_STORE_TAGS_DATA_TTL_IN_MS,
      data: tags
    }));
  }

  public setQuotesByTag = (name: Tag['name'], quotes: Quote[]) => {
    this.quotesByTag.set(name, quotes);

    localStorage.setItem(`${LocalStorageKeysEnum.QUOTABLE_STORE_QUOTE_DATA}`, JSON.stringify([...this.quotesByTag.entries()]));
  }

  public getQuotesByTag = (name: Tag['name']): Quote[] | undefined => {
    return this.quotesByTag.get(name);
  }

  public setCursor = (tag: Tag["name"]) => {
    if (!this.quotesByTag.has(tag)) {
      this._quotesByTagCursor = null;
      return;
    }

    this._quotesByTagCursor = this.quotesByTag.get(tag)!;
  }

  public get quotesByTagCursor() {
    return this._quotesByTagCursor;
  }
}