import { action, makeAutoObservable, toJS } from 'mobx';
import { ProposalEventServiceInstance } from '../services/ProposalEventService';
import { IProposalEventSearchResource } from '../types/ProposalEventSearchResource';
import { IProposalEventUpdateResource } from '../types/ProposalEventUpdateResource';

export class ProposalEventStore {

    events: IProposalEventSearchResource[] = [];
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

    upsertEventTags = async (event: IProposalEventUpdateResource): Promise<void> => {
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
    
    getOwnEvents = async (): Promise<void> => {
        try{
            this.startOperation();
            const eventsResponse = await ProposalEventServiceInstance.getOwnEvents();
            this.ownEvents = eventsResponse;
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