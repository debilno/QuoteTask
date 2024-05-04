import { Quote, QuoteResponse, Tag } from "../common/types";
import axios from "axios";
import { QUOTABLE_API_HOST } from "../config";

interface GetRandomQuotesOptions {
  limit?: number;
  maxLength?: number;
  minLength?: number;
  tags?: string;
  author?: string;
  authorId?: string;
}

interface GetTagsOptions {}

interface GetQuoteOptions {
  page?: number;
  tags?: string;
}

class QuotableApiService {

  public async getRandomQuotes(
    options: GetRandomQuotesOptions = {}
  ): Promise<Quote[]> {
    try {
      const url = new URL(`${QUOTABLE_API_HOST}quotes/random`);

      for (const [key, value] of Object.entries(options)) {
        if (value == null) {
          continue;
        }

        url.searchParams.set(key, value.toString());
      }

      const response = await axios.get<Quote[]>(url.toString());

      if (response.status !== 200) {
        console.warn(
          `[getRandomQuotes] failed with response: ${response.status}, ${response.statusText}`
        );
        return [];
      }

      return response.data;
    } catch (error) {
      console.error(`[getRandomQuotes]`, error);
      return [];
    }
  }

  public async getTags(options: GetTagsOptions = {}): Promise<Tag[]> {

    try {
      const url = new URL(`${QUOTABLE_API_HOST}tags`);

      for (const [key, value] of Object.entries(options)) {
        if (value == null) {
          continue;
        }

        url.searchParams.set(key, value.toString());
      }

      const response = await axios.get<Tag[]>(url.toString());

      if (response.status !== 200) {
        console.warn(
          `[getTags] failed with response: ${response.status}, ${response.statusText}`
        );
        return [];
      }

      return response.data;
    } catch (error) {
      console.error(`[getTags]`, error);
      return [];
    }
  }

  public async getQuotes(options: GetQuoteOptions = {} ): Promise<QuoteResponse | null> {
    
    try {
      const url = new URL(`${QUOTABLE_API_HOST}quotes`);

      for (const [key, value] of Object.entries(options)) {
        if (value == null) {
          continue;
        }

        url.searchParams.set(key, value.toString());
      }

      const response = await axios.get<QuoteResponse>(url.toString());

      if (response.status !== 200) {
        console.warn(
          `[getQuotesByTags] failed with response: ${response.status}, ${response.statusText}`
        );
      }

      return response.data;
    } catch (error) {
      console.error(`[getQuotes]`, error);

      return null;
    }
  }
}

export const QUOTABLE_API_SERVICE = new QuotableApiService();
