import { NeedRequestResource } from "./HelpEvent/NeedRequestResource";
import { IUserInfoResource } from "./UserInfoResource";

export class ITransactionResource{
    id?: number;

    creationDate?: Date;
    competitionDate?: Date;

    eventID?: number;
    eventType?: string;

    receiver: IUserInfoResource = new IUserInfoResource();
    creator: IUserInfoResource = new IUserInfoResource();
    responder: IUserInfoResource = new IUserInfoResource();
    comment?: string
    transactionStatus?: string;
    responderStatus?: string;

    needs?: NeedRequestResource[];
    isApproved?: boolean;
    completionPercentages?: number;

    reportURL?: string;
}