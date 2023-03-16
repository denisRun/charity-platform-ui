import { IUserInfoResource } from "./UserInfoResource";

export class ICommentResource{
    id?: number;
    text?: string;
    creationDate?: string;
    authorInfo?: IUserInfoResource = new IUserInfoResource();
}