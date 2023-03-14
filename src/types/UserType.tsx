import { IAddress } from "./Address";

export class IUser{
    id?: number;
    firstName?: string;
    secondName?: string
    email?: string;
    telephone?: string;
    companyName?: string;
    token?: string;
    refreshToken?: string;
    address?: IAddress;
}