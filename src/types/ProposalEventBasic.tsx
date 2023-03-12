import { IAddress } from "./Address";

export class IProposalEventBasic{
    id?: number;
    title?: string;
    description?: string;
    maxConcurrentRequests?: number;
    location?: IAddress;

    constructor(){
        this.location = new IAddress();
    }
}