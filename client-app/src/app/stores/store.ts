import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";

interface Store {
    activityStore: ActivityStore,
    userStore: UserStore,
    commonStore: CommonStore,
    modalStore: ModalStore,
    profileStore: ProfileStore,
    commentStore: CommentStore
}
 
export const store: Store = {
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore()
}
 
export const StoreContext = createContext(store);

function useStore() {
    return ( useContext(StoreContext) );
}

export default useStore;