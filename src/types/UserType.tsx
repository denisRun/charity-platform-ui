import { IAddress } from "./Address";

export interface IUser{
    id: string;
    firstName: string;
    secondName: string
    email: string;
    telephone: string;
    companyName: string;
    token: string;
    address: IAddress;
}