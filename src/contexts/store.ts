import {createContext} from "react";
import {QuotableStore} from "../stores/quotable";

const quotableStore = new QuotableStore();

export const storeContextDefault = {
  quotableStore: quotableStore
}

export const StoreContext = createContext(storeContextDefault)