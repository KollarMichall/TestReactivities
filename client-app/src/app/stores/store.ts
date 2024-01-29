import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    activityStore: ActivityStore
}
 
export const store: Store = {
    activityStore: new ActivityStore()
}
 
export const StoreContext = createContext(store);

function useStore() {
    return ( useContext(StoreContext) );
}

export default useStore;