import { IAddressResource } from "./AddressResource";
import { INotificationResource } from "./NotificationResource";
import { ITagResource } from "./TagResource";

export class IUserResource{
    id?: number;
    firstName?: string;
    secondName?: string
    email?: string;
    telephone?: string;
    companyName?: string;
    token?: string;
    refreshToken?: string;
    address?: IAddressResource;
    profileImageURL?: string;
    proposalEventSearchValues?: ITagResource[] = [];
    helpEventSearchValues?: ITagResource[] = [];
    transactionNotifications?: INotificationResource[] = []
}