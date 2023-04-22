import { IUserInfoResource } from "../UserInfoResource";
import { ICommentResource } from "../CommentResource";
import { ITagResource } from "../TagResource";
import { ITransactionResource } from "../TransactionResource";
import { NeedRequestResource } from "./NeedRequestResource";

export class IHelpEventSearchResource{
    id?: number;
    title?: string;
    description?: string;
    creationDate?: Date;
    // maxConcurrentRequests?: number;
    // availableHelps?: number;
    competitionDate?: Date;
    status?: string;
    imageURL?: string;
    authorInfo?: IUserInfoResource = new IUserInfoResource();
    comments?: ICommentResource[] = [];
    transactions?: ITransactionResource[] = [];
    tags?: ITagResource[] = [];

    needs?: NeedRequestResource[] = [];
    completionPercentages?: number;

    constructor(){
        this.tags = [];
    }
}