import axios from "../axios/Axios";
import { ICommentResource } from "../types/CommentResource";
import { IPagedResultSet } from "../types/PagedResultSet";
import { IProposalEventSearchResource } from "../types/ProposalEvent/ProposalEventSearchResource";
import { IProposalEventUpdateResource } from "../types/ProposalEvent/ProposalEventUpdateResource";
import { ProposalRequestCreateRequest } from "../types/ProposalEvent/ProposalRequestCreateRequest";
import { ProposalRequestStatusUpdateResource } from "../types/ProposalEvent/ProposalRequestStatusUpdateResource";
import { IProposalStatisticsResource } from "../types/ProposalEvent/ProposalStatistics";
import { IProposalSearchRequest } from "../types/ProposalEvent/ProposaSearchRequest";


export interface IProposalEventService{
    createEvent(event: IProposalEventUpdateResource): Promise<createdItem>;
    updateEvent(event: IProposalEventUpdateResource): Promise<void>;
    searchEvents(request: IProposalSearchRequest): Promise<IPagedResultSet<IProposalEventSearchResource>>;
    getOwnEvents(): Promise<IProposalEventSearchResource[]>;
    getById(id: string): Promise<IProposalEventSearchResource>;
    addComment(text: string, id: number): Promise<void>;
    addEventRequest(request: ProposalRequestCreateRequest): Promise<void>;
    acceptRequest(id: number, accept: boolean): Promise<void>;
    updateRequestStatus(requestId: number, newStatus: ProposalRequestStatusUpdateResource): Promise<void>;
    getStatistics(): Promise<IProposalStatisticsResource>;
}

class getOwnEventsResponse{
    proposalEvents: IProposalEventUpdateResource[] = []
}

class createdItem{
    id?: number;
}


const proposalControllerPath = "api/events/proposal";

class ProposalEventService implements IProposalEventService{

    async createEvent(event: IProposalEventUpdateResource): Promise<createdItem> {
        const response = await axios.post<createdItem>(proposalControllerPath + "/create", JSON.stringify(event));
        return response.data;
    }

    async updateEvent(event: IProposalEventUpdateResource): Promise<void> {
        const response = await axios.put<void>(proposalControllerPath + "/update/" + event.id, JSON.stringify(event));
        return response.data;
    }

    async searchEvents(request: IProposalSearchRequest): Promise<IPagedResultSet<IProposalEventSearchResource>> {
        const response = await axios.post<IPagedResultSet<IProposalEventSearchResource>>("open-api/proposal-search", JSON.stringify(request));
        return response.data;
    }

    async getOwnEvents(): Promise<IProposalEventSearchResource[]> {
        const response = await axios.get<getOwnEventsResponse>(proposalControllerPath + "/get-own");
        return response.data.proposalEvents;
    }

    async getById(id: string): Promise<IProposalEventSearchResource> {
        const response = await axios.get<IProposalEventSearchResource>("open-api/proposal/" + id);
        return response.data;
    }

    async addComment(text: string, id: number): Promise<void> {
        const queryObj = {
            text: text,
            eventId: id
        }
        const response = await axios.post<void>(proposalControllerPath + "/comment", JSON.stringify(queryObj));
        return response.data;
    }

    async addEventRequest(request: ProposalRequestCreateRequest): Promise<void> {
        const response = await axios.post<void>(proposalControllerPath + "/response", JSON.stringify(request));
        return response.data;
    }

    async acceptRequest(id: number, accept: boolean): Promise<void> {
        let request = {
            isAccepted: accept
        }
        const response = await axios.post<void>(proposalControllerPath + "/accept/" + id, JSON.stringify(request));
        return response.data;
    }

    async updateRequestStatus(requestId: number, newStatus: ProposalRequestStatusUpdateResource): Promise<void> {
        const response = await axios.post<void>(proposalControllerPath + "/update-status/"+requestId, newStatus);
        return response.data;
    }

    async getStatistics(): Promise<IProposalStatisticsResource> {
        const response = await axios.get<IProposalStatisticsResource>(proposalControllerPath + "/statistics");
        return response.data;
    }

    

}

/**
 * Export only one Instance of class
*/
export const ProposalEventServiceInstance: IProposalEventService = new ProposalEventService();