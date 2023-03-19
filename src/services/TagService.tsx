import axios from "../axios/Axios";
import { ICommentResource } from "../types/CommentResource";
import { IPagedResultSet } from "../types/PagedResultSet";
import { IProposalEventSearchResource } from "../types/ProposalEventSearchResource";
import { IProposalEventUpdateResource } from "../types/ProposalEventUpdateResource";
import { ITagResource } from "../types/TagResource";


export interface ITagService{
    upsertProposalEventTags(eventId:number, tags: ITagResource[]): Promise<void>;
}

class getOwnEventsResponse{
    proposalEvents: IProposalEventUpdateResource[] = []
}

const tagsControllerPath = "api/tags";

class Tagervice implements ITagService{

    async upsertProposalEventTags(eventId:number, tags: ITagResource[]): Promise<void> {

        const request = {
            eventId: eventId,
            eventType: "proposal-event",
            tags: tags
        }
        const response = await axios.post<void>(tagsControllerPath + "/upsert", JSON.stringify(request));
        return response.data;
    }

}

/**
 * Export only one Instance of class
*/
export const TagServiceInstance: ITagService = new Tagervice();