import { ITagResource } from "./TagResource";

export class IProposalSearchRequest{
    pageNumber?: number = 1;
    pageSize?: number = 1;
    name?: string;
    sortField?: string;
    order?: string;
    statusStates?: string;
    tags?: ITagResource[] = [];
    takingPart?: boolean = false;
}