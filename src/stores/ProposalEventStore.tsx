import { action, makeAutoObservable, toJS } from 'mobx';
import { IProposalEventService } from '../services/ProposalEventService';
import { TagServiceInstance } from '../services/TagService';
import { IProposalEventSearchResource } from '../types/ProposalEvent/ProposalEventSearchResource';
import { IProposalEventUpdateResource } from '../types/ProposalEvent/ProposalEventUpdateResource';
import { ProposalRequestCreateRequest } from '../types/ProposalEvent/ProposalRequestCreateRequest';
import { ProposalRequestStatusUpdateResource } from '../types/ProposalEvent/ProposalRequestStatusUpdateResource';
import { IProposalSearchRequest } from '../types/ProposalEvent/ProposaSearchRequest';
import { ITagResource } from '../types/TagResource';
import { IProposalStatisticsResource } from '../types/ProposalEvent/ProposalStatistics';
import { IComplainCreateResource } from '../types/ComplainCreateResource';
import { IComplaintService } from '../services/ComplaintService';

export class ProposalEventStore {

    events: IProposalEventSearchResource[] = [];
    eventsTotalPageCount: number = 1;

    ownEvents: IProposalEventSearchResource[]  = [];

    tookPartEvents: IProposalEventSearchResource[] = [];
    tookPartEventsTotalPageCount: number = 1;

    event: IProposalEventSearchResource = new IProposalEventSearchResource();

    statistics: IProposalStatisticsResource = new IProposalStatisticsResource();

    EventService: IProposalEventService;
    ComplaintService: IComplaintService;

    constructor(EventService: IProposalEventService, ComplaintService: IComplaintService){
        makeAutoObservable(this);
        this.EventService = EventService;
        this.ComplaintService = ComplaintService;
    } 

    createEvent = async (event: IProposalEventUpdateResource): Promise<number> => {
        try{
            this.startOperation();
            const createdEventId = (await this.EventService.createEvent(event)).id;
            this.finishOperation();
            return createdEventId!;
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
            return -1;
        }
    }  

    updateEvent = async (event: IProposalEventUpdateResource): Promise<void> => {
        try{
            this.startOperation();
            await this.EventService.updateEvent(event);
            this.event = await this.EventService.getById(event.id?.toString()!)
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    upsertEventTags = async (eventType: string, tags: ITagResource[]): Promise<void> => {
        try{
            this.startOperation();
            await TagServiceInstance.upsertEventTags(eventType ,this.event.id!, tags);
            this.event = await this.EventService.getById(this.event.id?.toString()!)
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  
    
    searchEvents = async (request: IProposalSearchRequest): Promise<void> => {
        try{
            this.startOperation();
            const searchResponse = await this.EventService.searchEvents(request);
            if(request.takingPart){
                this.tookPartEvents = searchResponse.items ?? [];
                this.tookPartEventsTotalPageCount = searchResponse.totalPageCount ?? 1;
            } else {
                this.events = searchResponse.items ?? [];
                this.eventsTotalPageCount = searchResponse.totalPageCount ?? 1;
            }
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    getOwnEvents = async (): Promise<void> => {
        try{
            this.startOperation();
            const eventsResponse = await this.EventService.getOwnEvents();
            this.ownEvents = eventsResponse ?? [];
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }    

    getById = async (id: string): Promise<void> => {
        try{
            this.startOperation();
            const eventsResponse = await this.EventService.getById(id);
            this.event = eventsResponse;
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }    

    addComment = async (text: string): Promise<void> => {
        try{
            this.startOperation();
            await this.EventService.addComment(text, this.event.id!);
            this.event = await this.EventService.getById(this.event.id?.toString()!);
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }   

    addEventRequest = async (request: ProposalRequestCreateRequest): Promise<void> => {
        try{
            this.startOperation();
            await this.EventService.addEventRequest(request);
            this.event = await this.EventService.getById(this.event.id?.toString()!);
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    acceptRequest = async (requestId: number, accept: boolean): Promise<void> => {
        try{
            this.startOperation();
            await this.EventService.acceptRequest(requestId, accept);
            this.event = await this.EventService.getById(this.event.id?.toString()!);
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    updateRequestStatus = async (requestId: number, newStatus: ProposalRequestStatusUpdateResource): Promise<void> => {
        try{
            this.startOperation();
            await this.EventService.updateRequestStatus(requestId, newStatus);
            this.event = await this.EventService.getById(this.event.id?.toString()!);
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    getStatistics = async (): Promise<void> => {
        try{
            this.startOperation();
            this.statistics = await this.EventService.getStatistics();
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    createComplaint = async (request: IComplainCreateResource): Promise<void> => {
        try{
            this.startOperation();
            await this.ComplaintService.createComplaint(request);
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    isLoading: boolean = false;
    isError: boolean = false;
    errorMessage: string = '';

    startOperation = () => {
        this.isLoading = true;
        this.isError = false;
        this.errorMessage = '';
    }

    finishOperation = () => {
        this.isLoading = false;
        this.isError = false;
        this.errorMessage = '';
    }

    operationFailed = (ex: string) => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = ex;
    }
}