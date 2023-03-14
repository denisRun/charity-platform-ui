import { IAddress } from "./Address";
import { ITags } from "./Tags";

export class IProposalEventBasic{
    id?: number;
    title?: string;
    description?: string;
    maxConcurrentRequests?: number;
    location?: IAddress;
    tags?: ITags[];

    constructor(){
        this.location = new IAddress();
        this.tags = [];
    }
}