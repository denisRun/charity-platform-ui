import { IUserResource } from "./UserResource";

export class IPagedResultSet<T>{
    pageNumber!: number;
    pageSize!: number;
    totalPageCount!: number;
    totalItemCount!: number;
    items!: T[]
}