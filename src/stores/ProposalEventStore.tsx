import { action, makeAutoObservable, toJS } from 'mobx';
import { ProposalEventServiceInstance } from '../services/ProposalEventService';
import { TagServiceInstance } from '../services/TagService';
import { IProposalEventSearchResource } from '../types/ProposalEventSearchResource';
import { IProposalEventUpdateResource } from '../types/ProposalEventUpdateResource';
import { ProposalRequestCreateRequest } from '../types/ProposalRequestCreateRequest';
import { IProposalSearchRequest } from '../types/ProposaSearchRequest';
import { ITagResource } from '../types/TagResource';

export class ProposalEventStore {

    events: IProposalEventSearchResource[] = [];
    eventsTotalPageCount: number = 1;

    ownEvents: IProposalEventSearchResource[]  = [];
    tookPartEvents: IProposalEventSearchResource[] = [];

    event: IProposalEventSearchResource = new IProposalEventSearchResource();

    isLoading: boolean = false;
    isError: boolean = false;
    errorMessage: string = '';

    constructor(){
        makeAutoObservable(this);
    } 

    createEvent = async (event: IProposalEventUpdateResource): Promise<void> => {
        try{
            this.startOperation();
            const createdEvent = await ProposalEventServiceInstance.createEvent(event);
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    updateEvent = async (event: IProposalEventUpdateResource): Promise<void> => {
        try{
            this.startOperation();
            await ProposalEventServiceInstance.updateEvent(event);
            this.event = await ProposalEventServiceInstance.getById(event.id?.toString()!)
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
            this.event = await ProposalEventServiceInstance.getById(this.event.id?.toString()!)
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  
    
    searchEvents = async (request: IProposalSearchRequest): Promise<void> => {
        try{
            this.startOperation();
            const searchResponse = await ProposalEventServiceInstance.searchEvents(request);
            this.events = searchResponse.items ?? [];
            this.eventsTotalPageCount = searchResponse.totalPageCount ?? 1;
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    getOwnEvents = async (): Promise<void> => {
        try{
            this.startOperation();
            const eventsResponse = await ProposalEventServiceInstance.getOwnEvents();
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
            const eventsResponse = await ProposalEventServiceInstance.getById(id);
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
            await ProposalEventServiceInstance.addComment(text, this.event.id!);
            this.event = await ProposalEventServiceInstance.getById(this.event.id?.toString()!);
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }   

    addEventRequest = async (request: ProposalRequestCreateRequest): Promise<void> => {
        try{
            this.startOperation();
            await ProposalEventServiceInstance.addEventRequest(request);
            this.event = await ProposalEventServiceInstance.getById(this.event.id?.toString()!);
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

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

export default new ProposalEventStore();