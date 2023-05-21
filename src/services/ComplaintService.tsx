import axios from "../axios/Axios";
import { ICommentResource } from "../types/CommentResource";
import { IComplainCreateResource } from "../types/ComplainCreateResource";
import { IComplainSearchResource } from "../types/ComplainSearchResource";
import { IPagedResultSet } from "../types/PagedResultSet";
import { IProposalEventSearchResource } from "../types/ProposalEvent/ProposalEventSearchResource";
import { IProposalEventUpdateResource } from "../types/ProposalEvent/ProposalEventUpdateResource";
import { ITagResource } from "../types/TagResource";


export interface IComplaintService{
    createComplaint(request: IComplainCreateResource): Promise<void>;
    getComplaints(): Promise<IComplainSearchResource>;
    banUser(userId: number): Promise<void>;
    banEvent(eventId: number, eventType: string): Promise<void>
}

const tagsControllerPath = "api/complaint/";

class ComplaintService implements IComplaintService{

    async createComplaint(request: IComplainCreateResource): Promise<void> {
        const response = await axios.post<void>(tagsControllerPath, JSON.stringify(request));
        return response.data;
    }

    async getComplaints(): Promise<IComplainSearchResource> {
        const response = await axios.get<IComplainSearchResource>(tagsControllerPath);
        return response.data;
    }

    async banUser(userId: number): Promise<void> {
        const response = await axios.post<void>(tagsControllerPath+"ban-user/"+userId);
        return response.data;
    }

    async banEvent(eventId: number, eventType: string): Promise<void> {
        let request = {
            id: eventId,
            type: eventType
        }
        const response = await axios.post<void>(tagsControllerPath+"ban-event", request);
        return response.data;
    }
}

/**
 * Export only one Instance of class
*/
export const ComplaintServiceInstance: IComplaintService = new ComplaintService();