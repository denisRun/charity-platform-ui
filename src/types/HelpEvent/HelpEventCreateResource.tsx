import { ITagResource } from "../TagResource";
import { NeedRequestResource } from "./NeedRequestResource";

export class IHelpEventCreateResource{
    id?: number;
    title?: string;
    description?: string;
    // maxConcurrentRequests?: number;
    status?: string;
    fileBytes?: number[];
    fileType?: string;
    tags?: ITagResource[];
    needs?: NeedRequestResource[];

    constructor(){
        this.tags = [];
        this.needs = []
    }
}