import { IUserInfoResource } from "./UserInfoResource";

export class ICommentResource{
    id?: number;
    text?: string;
    creationDate?: Date;
    authorInfo?: IUserInfoResource = new IUserInfoResource();

    constructor(){}
}