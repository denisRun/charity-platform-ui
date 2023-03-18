import { IAddressResource } from "./AddressResource";

export class IUserSignupRequest{
    firstName?: string;
    secondName?: string;
    email?: string;
    password?: string;
    telephone?: string;
    companyName?: string;
    companyLink?: string;
    address?: IAddressResource;

    constructor(){
        this.address = new IAddressResource();
    }
}