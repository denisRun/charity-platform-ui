import { NeedRequestResource } from "./NeedRequestResource";

export class HelpRequestStatusUpdateResource{
    id?: number;
    fileBytes?: number[] = [];
    fileType?: string = "";
    status?: string;
    needs?: NeedRequestResource[] = [];
}