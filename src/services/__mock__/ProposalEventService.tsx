import { IPagedResultSet } from "../../types/PagedResultSet";
import { IProposalSearchRequest } from "../../types/ProposalEvent/ProposaSearchRequest";
import { IProposalEventSearchResource } from "../../types/ProposalEvent/ProposalEventSearchResource";
import { IProposalEventUpdateResource } from "../../types/ProposalEvent/ProposalEventUpdateResource";
import { ProposalRequestCreateRequest } from "../../types/ProposalEvent/ProposalRequestCreateRequest";
import { ProposalRequestStatusUpdateResource } from "../../types/ProposalEvent/ProposalRequestStatusUpdateResource";
import { IProposalStatisticsResource } from "../../types/ProposalEvent/ProposalStatistics";
import { IProposalEventService, createdItem } from "../ProposalEventService";

class ProposalEventServiceMock implements IProposalEventService {

    public async createEvent(event: IProposalEventUpdateResource): Promise<createdItem> {
        let created = new createdItem();
        created.id = 5;
        return Promise.resolve(created);
    }

    public async updateEvent(event: IProposalEventUpdateResource): Promise<void> {
        return Promise.resolve();
    }

    public async searchEvents(request: IProposalSearchRequest): Promise<IPagedResultSet<IProposalEventSearchResource>> {
        let result = new IPagedResultSet<IProposalEventSearchResource>();
        result.items = []; 
        result.items.push(this.eventSearchResource);
        result.pageNumber = 1;
        result.totalPageCount = 2;
        result.totalItemCount = 5;
        return Promise.resolve(result);
    }

    public async getOwnEvents(): Promise<IProposalEventSearchResource[]> {
        let result: IProposalEventSearchResource[] = []
        result.push(this.eventSearchResource);
        return Promise.resolve(result);
    }

    public async getById(id: string): Promise<IProposalEventSearchResource> {
        return Promise.resolve(this.eventSearchResource);
    }

    public async addComment(text: string, id: number): Promise<void> {
        return Promise.resolve();
    }

    public async addEventRequest(request: ProposalRequestCreateRequest): Promise<void> {
        return Promise.resolve();
    }

    public async acceptRequest(id: number, accept: boolean): Promise<void> {
        return Promise.resolve();
    }

    public async updateRequestStatus(requestId: number, newStatus: ProposalRequestStatusUpdateResource): Promise<void> {
        return Promise.resolve();
    }

    public async getStatistics(): Promise<IProposalStatisticsResource> {
        let result = new IProposalStatisticsResource();
        result.transactionsCount = 2;
        result.transactionsCountCompare = 100; 
        return Promise.resolve(result);
    }

    eventSearchResource: IProposalEventSearchResource = {
        id : 1,
        title : "title",
        description : "description",
        imageURL : "imageURL"
      };
  }
  
 export const MockProposalServiceInstance = new ProposalEventServiceMock();