import { IUserInfoResource } from "./UserInfoResource";
import { ICommentResource } from "./CommentResource";
import { ITagResource } from "./TagResource";
import { ITransactionResource } from "./TransactionResource";

export class IProposalEventSearchResource{
    id?: number;
    title?: string;
    description?: string;
    creationDate?: Date;
    maxConcurrentRequests?: number;
    availableHelps?: number;
    competitionDate?: Date;
    status?: string;
    authorInfo?: IUserInfoResource = new IUserInfoResource();
    comments?: ICommentResource[] = [];
    transactions?: ITransactionResource[] = [];
    tags?: ITagResource[] = [];

    constructor(){
        this.tags = [];
    }
}