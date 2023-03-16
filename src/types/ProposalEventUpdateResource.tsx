import { IAddress } from "./Address";
import { ITags } from "./Tags";

export class IProposalEventUpdateResource{
    id?: number;
    title?: string;
    description?: string;
    maxConcurrentRequests?: number;
    tags?: ITags[];

    constructor(){
        this.tags = [];
    }
}