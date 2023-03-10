import { IAddress } from "./Address";

export class IUserSignup{
    firstName?: string;
    secondName?: string;
    email?: string;
    password?: string;
    telephone?: string;
    companyName?: string;
    companyLink?: string;
    address?: IAddress;

    constructor(){
        this.address = new IAddress();
    }
}