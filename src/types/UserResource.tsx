import { IAddressResource } from "./AddressResource";

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
}