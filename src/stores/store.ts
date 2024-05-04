import {useContext} from "react";
import {StoreContext} from "../contexts/store";

export const useQuotableStore = () => useContext(StoreContext).quotableStore;
