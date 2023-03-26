import { IUserInfoResource } from "./UserInfoResource";

export class ITransactionResource{
    id?: number;

    creationDate?: Date;
    competitionDate?: Date;

    eventID?: number;
    eventType?: string;

    creator: IUserInfoResource = new IUserInfoResource();
    responder: IUserInfoResource = new IUserInfoResource();
    comment?: string
    transactionStatus?: string;
    responderStatus?: string;

    reportURL?: string;
}