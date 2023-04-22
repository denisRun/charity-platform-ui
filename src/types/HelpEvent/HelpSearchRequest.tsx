import { ITagResource } from "../TagResource";

export class IHelpSearchRequest{
    pageNumber?: number = 1;
    pageSize?: number = 5;
    name?: string;
    sortField?: string;
    order?: string;
    statusStates?: string;
    tags?: ITagResource[] = [];
    takingPart?: boolean = false;
}