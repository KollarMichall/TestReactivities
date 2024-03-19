import { User } from "./user";

export interface IProfile {
displayName: string;
username: string;
image?: string;
bio?:string;
}
export class Profile implements IProfile{

constructor(user: User) {
    this.username = user.username;
    this.displayName = user.displayName;
    this.image = user.image;
    
}
    displayName: string;
    username: string;
    image?: string | undefined;
    bio?: string | undefined;
}