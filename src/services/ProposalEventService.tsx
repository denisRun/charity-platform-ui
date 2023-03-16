import axios from "../axios/Axios";
import { IPagedResultSet } from "../types/PagedResultSet";
import { IProposalEventSearchResource } from "../types/ProposalEventSearchResource";
import { IProposalEventUpdateResource } from "../types/ProposalEventUpdateResource";


export interface IProposalEventService{
    createEvent(event: IProposalEventUpdateResource): Promise<void>;
    getOwnEvents(): Promise<IProposalEventSearchResource[]>;
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

    async getOwnEvents(): Promise<IProposalEventSearchResource[]> {
        const response = await axios.get<getOwnEventsResponse>(proposalControllerPath + "/get-own");
        return response.data.proposalEvents;
    }

}

/**
 * Export only one Instance of class
*/
export const ProposalEventServiceInstance: IProposalEventService = new ProposalEventService();