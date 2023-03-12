import axios from "../axios/Axios";
import { IPagedResultSet } from "../types/PagedResultSet";
import { IProposalEventBasic } from "../types/ProposalEventBasic";


export interface IProposalEventService{
    createEvent(event: IProposalEventBasic): Promise<void>;
}

const proposalControllerPath = "api/events/proposal";

class ProposalEventService implements IProposalEventService{

    async createEvent(event: IProposalEventBasic): Promise<void> {
        const response = await axios.post<void>(proposalControllerPath + "/create", JSON.stringify(event));
        return response.data;
    }

}

/**
 * Export only one Instance of class
*/
export const ProposalEventServiceInstance: IProposalEventService = new ProposalEventService();