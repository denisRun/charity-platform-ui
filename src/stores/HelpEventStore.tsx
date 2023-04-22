import { action, makeAutoObservable, toJS } from 'mobx';
import { IHelpEventSearchResource } from '../types/HelpEvent/HelpEventSearchResource';
import { IHelpEventService } from '../services/HelpEventService';
import { IHelpEventCreateResource } from '../types/HelpEvent/HelpEventCreateResource';
import { IHelpSearchRequest } from '../types/HelpEvent/HelpSearchRequest';
import { TagServiceInstance } from '../services/TagService';
import { ITagResource } from '../types/TagResource';
import { HelpRequestStatusUpdateResource } from '../types/HelpEvent/HelpRequestStatusUpdateResource';
import { IHelpStatisticsResource } from '../types/HelpEvent/HelpStatistics';

export class HelpEventStore {

    events: IHelpEventSearchResource[] = [];
    eventsTotalPageCount: number = 1;

    ownEvents: IHelpEventSearchResource[]  = [];

    tookPartEvents: IHelpEventSearchResource[] = [];
    tookPartEventsTotalPageCount: number = 1;

    event: IHelpEventSearchResource = new IHelpEventSearchResource();

    statistics: IHelpStatisticsResource = new IHelpStatisticsResource();

    EventService: IHelpEventService;

    constructor(EventService: IHelpEventService){
        makeAutoObservable(this);
        this.EventService = EventService;
    } 

    createEvent = async (event: IHelpEventCreateResource): Promise<number> => {
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

    updateEvent = async (event: IHelpEventCreateResource): Promise<void> => {
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
    
    searchEvents = async (request: IHelpSearchRequest): Promise<void> => {
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

    addEventRequest = async (): Promise<void> => {
        try{
            this.startOperation();
            await this.EventService.addEventRequest(this.event.id!);
            this.event = await this.EventService.getById(this.event.id?.toString()!);
            this.finishOperation();
        } catch(ex){
            console.log(ex);
            this.operationFailed((ex as any).errorMessage);
        }
    }  

    // acceptRequest = async (requestId: number, accept: boolean): Promise<void> => {
    //     try{
    //         this.startOperation();
    //         await this.EventService.acceptRequest(requestId, accept);
    //         this.event = await this.EventService.getById(this.event.id?.toString()!);
    //         this.finishOperation();
    //     } catch(ex){
    //         console.log(ex);
    //         this.operationFailed((ex as any).errorMessage);
    //     }
    // }  

    updateRequestStatus = async (requestId: number, newStatus: HelpRequestStatusUpdateResource): Promise<void> => {
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