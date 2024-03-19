
 import { makeAutoObservable, reaction } from 'mobx';
import { ServerError } from '../models/serverError'
class CommonStore {
    error: ServerError | null = null;
    token: string | null | undefined = localStorage.getItem('jwt');
    appLoaded = false;
    constructor() {
       makeAutoObservable(this)

       reaction(() => this.token, token => {
        if (token){
            localStorage.setItem('jwt', token)
        }else
{
    localStorage.removeItem('jwt')
}       })
    }
   serverError(error: ServerError){
    this.error = error;
   }
   setToken(token: string | null){
    if (token) localStorage.setItem('jwt', token);
    this.token = token;
   }
   setAppLoaded = () => {
    this.appLoaded = true;
   }
}
 
export default CommonStore;