import { ITagResource } from "./TagResource";

export class UserSearchRequest{
    pageNumber!: number;
    pageSize!: number;
    name?: string;
    sortField?: string;
    order?: string;
    statusStates?: string;
    tags?: ITagResource[] = [];
    takingPart?: boolean = false;
}