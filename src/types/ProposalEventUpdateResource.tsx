import { IAddressResource } from "./AddressResource";
import { IProposalEventSearchResource } from "./ProposalEventSearchResource";
import { ITagResource } from "./TagResource";

export class IProposalEventUpdateResource{
    id?: number;
    title?: string;
    description?: string;
    maxConcurrentRequests?: number;
    fileBytes?: number[];
    fileType?: string;
    tags?: ITagResource[];

    constructor(){
        this.tags = [];
    }

    public static searchResourceConstructor(item?: IProposalEventSearchResource):IProposalEventUpdateResource  {
        const newItem = new IProposalEventUpdateResource();
        newItem.id = item?.id;
        newItem.title = item?.title;
        newItem.description = item?.description;
        newItem.maxConcurrentRequests = item?.maxConcurrentRequests;

        return newItem
    }
}