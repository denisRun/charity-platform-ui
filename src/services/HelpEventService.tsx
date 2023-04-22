import axios from "../axios/Axios";
import { IHelpEventCreateResource } from "../types/HelpEvent/HelpEventCreateResource";
import { IHelpEventSearchResource } from "../types/HelpEvent/HelpEventSearchResource";
import { HelpRequestStatusUpdateResource } from "../types/HelpEvent/HelpRequestStatusUpdateResource";
import { IHelpSearchRequest } from "../types/HelpEvent/HelpSearchRequest";
import { IHelpStatisticsResource } from "../types/HelpEvent/HelpStatistics";
import { NeedRequestResource } from "../types/HelpEvent/NeedRequestResource";
import { IPagedResultSet } from "../types/PagedResultSet";
import { ITransactionResource } from "../types/TransactionResource";


export interface IHelpEventService{
    createEvent(event: IHelpEventCreateResource): Promise<createdItem>;
    updateEvent(event: IHelpEventCreateResource): Promise<void>;
    searchEvents(request: IHelpSearchRequest): Promise<IPagedResultSet<IHelpEventSearchResource>>;
    getOwnEvents(): Promise<IHelpEventSearchResource[]>;
    getById(id: string): Promise<IHelpEventSearchResource>;
    addComment(text: string, id: number): Promise<void>;
    addEventRequest(eventId: number): Promise<void>;
    // acceptRequest(id: number, accept: boolean): Promise<void>;
    updateRequestStatus(requestId: number, newStatus: HelpRequestStatusUpdateResource): Promise<void>;
    getStatistics(): Promise<IHelpStatisticsResource>;
}

export class getOwnEventsResponse{
    events: IHelpEventSearchResource[] = []
}

export class createdItem{
    id?: number;
}

const helpControllerPath = "api/events/help";

class HelpEventService implements IHelpEventService{

    async createEvent(event: IHelpEventCreateResource): Promise<createdItem> {
        const response = await axios.post<createdItem>(helpControllerPath + "/create", JSON.stringify(event));
        return response.data;
    }

    async updateEvent(event: IHelpEventCreateResource): Promise<void> {
        const response = await axios.put<void>(helpControllerPath + "/" + event.id, JSON.stringify(event));
        return response.data;
    }

    async searchEvents(request: IHelpSearchRequest): Promise<IPagedResultSet<IHelpEventSearchResource>> {
        const response = await axios.post<IPagedResultSet<IHelpEventSearchResource>>("open-api/help-search", JSON.stringify(request));
        return response.data;
    }

    async getOwnEvents(): Promise<IHelpEventSearchResource[]> {
        const response = await axios.get<getOwnEventsResponse>(helpControllerPath + "/own");
        return response.data.events;
    }

    async getById(id: string): Promise<IHelpEventSearchResource> {
        const response = await axios.get<IHelpEventSearchResource>("open-api/help/" + id);
        return response.data;
    }

    async addComment(text: string, id: number): Promise<void> {
        const queryObj = {
            text: text,
            eventId: id
        }
        const response = await axios.post<void>(helpControllerPath + "/comment", JSON.stringify(queryObj));
        return response.data;
    }

    async addEventRequest(eventId: number): Promise<void> {
        let request = {
            id: eventId
        }
        const response = await axios.post<void>(helpControllerPath + "/response", JSON.stringify(request));
        return response.data;
    }

    // async acceptRequest(id: number, accept: boolean): Promise<void> {
    //     let request = {
    //         isAccepted: accept
    //     }
    //     const response = await axios.post<void>(helpControllerPath + "/accept/" + id, JSON.stringify(request));
    //     return response.data;
    // }

    async updateRequestStatus(requestId: number, newStatus: HelpRequestStatusUpdateResource): Promise<void> {
        newStatus.id = requestId;
        const response = await axios.put<void>(helpControllerPath + "/transaction", newStatus);
        return response.data;
    }

    async getStatistics(): Promise<IHelpStatisticsResource> {
        const response = await axios.get<IHelpStatisticsResource>(helpControllerPath + "/statistics");
        return response.data;
    }
}

/**
 * Export only one Instance of class
*/
export const HelpEventServiceInstance: IHelpEventService = new HelpEventService();