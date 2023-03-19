import { IUserInfoResource } from "./UserInfoResource";

export class ICommentResource{
    id?: number;
    text?: string;
    creationDate?: Date;
    username?: string;
    profileImageURL?: string;
    //authorInfo?: IUserInfoResource = new IUserInfoResource();

    constructor(){}
}