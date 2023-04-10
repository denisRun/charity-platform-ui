import axios from "../axios/Axios";
import { ICommentResource } from "../types/CommentResource";
import { IPagedResultSet } from "../types/PagedResultSet";
import { IProposalEventSearchResource } from "../types/ProposalEvent/ProposalEventSearchResource";
import { IProposalEventUpdateResource } from "../types/ProposalEvent/ProposalEventUpdateResource";
import { ITagResource } from "../types/TagResource";


export interface ITagService{
    upsertEventTags(eventType: string, eventId: number, tags: ITagResource[]): Promise<void>;
    upsertUserSearchTags(eventType: string, tags: ITagResource[]): Promise<void>;
}

class getOwnEventsResponse{
    proposalEvents: IProposalEventUpdateResource[] = []
}

const tagsControllerPath = "api/tags";

class Tagervice implements ITagService{

    async upsertEventTags(eventType: string, eventId:number, tags: ITagResource[]): Promise<void> {

        const request = {
            eventId: eventId,
            eventType: eventType,
            tags: tags
        }
        const response = await axios.post<void>(tagsControllerPath + "/upsert", JSON.stringify(request));
        return response.data;
    }

    async upsertUserSearchTags(eventType: string, tags: ITagResource[]): Promise<void> {

        const request = {
            eventType: eventType,
            tags: tags
        }
        const response = await axios.post<void>(tagsControllerPath + "/user-search", JSON.stringify(request));
        return response.data;
    }

}

/**
 * Export only one Instance of class
*/
export const TagServiceInstance: ITagService = new Tagervice();