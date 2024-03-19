import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { route } from "../router/Routes";

 
class UserStore {
    user: User | null = null;

    constructor() {
       makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !!this.user;
    }
    login = async (creds: UserFormValues) => {
        const user = await agent.Account.login(creds);
        store.commonStore.setToken(user.token);
        runInAction(() => this.user = user);
        route.navigate('/activities');
        store.modalStore.closeModal();
    }

    register = async (creds: UserFormValues) => {
        const user = await agent.Account.register(creds);
        store.commonStore.setToken(user.token);
        runInAction(() => this.user = user);
        route.navigate('/activities');
        store.modalStore.closeModal();
    }

    logout = () => {
        store.commonStore.setToken(null);
        localStorage.removeItem('jwt');
        this.user = null;
        route.navigate('/');

    }
    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
            
        }
    }
}
 
export default UserStore;