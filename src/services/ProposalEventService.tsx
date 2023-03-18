import axios from "../axios/Axios";
import { ICommentResource } from "../types/CommentResource";
import { IPagedResultSet } from "../types/PagedResultSet";
import { IProposalEventSearchResource } from "../types/ProposalEventSearchResource";
import { IProposalEventUpdateResource } from "../types/ProposalEventUpdateResource";


export interface IProposalEventService{
    createEvent(event: IProposalEventUpdateResource): Promise<void>;
    updateEvent(event: IProposalEventUpdateResource): Promise<void>;
    getOwnEvents(): Promise<IProposalEventSearchResource[]>;
    getById(id: string): Promise<IProposalEventSearchResource>;
    addComment(text: string, id: number): Promise<void>;
}

class getOwnEventsResponse{
    proposalEvents: IProposalEventUpdateResource[] = []
}

const proposalControllerPath = "api/events/proposal";

class ProposalEventService implements IProposalEventService{

    async createEvent(event: IProposalEventUpdateResource): Promise<void> {
        const response = await axios.post<void>(proposalControllerPath + "/create", JSON.stringify(event));
        return response.data;
    }

    async updateEvent(event: IProposalEventUpdateResource): Promise<void> {
        const response = await axios.put<void>(proposalControllerPath + "/update/" + event.id, JSON.stringify(event));
        return response.data;
    }

    async getOwnEvents(): Promise<IProposalEventSearchResource[]> {
        const response = await axios.get<getOwnEventsResponse>(proposalControllerPath + "/get-own");
        return response.data.proposalEvents;
    }

    async getById(id: string): Promise<IProposalEventSearchResource> {
        const response = await axios.get<IProposalEventSearchResource>(proposalControllerPath + "/get/" + id);
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

}

/**
 * Export only one Instance of class
*/
export const ProposalEventServiceInstance: IProposalEventService = new ProposalEventService();