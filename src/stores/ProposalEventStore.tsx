import { action, makeAutoObservable, toJS } from 'mobx';
import { ProposalEventServiceInstance } from '../services/ProposalEventService';
import { IProposalEventSearchResource } from '../types/ProposalEventSearchResource';
import { IProposalEventUpdateResource } from '../types/ProposalEventUpdateResource';

export class ProposalEventStore {
    events: IProposalEventSearchResource[] = [];
    ownEvents: IProposalEventSearchResource[]  = [];
    tookPartEvents: IProposalEventSearchResource[] = [];
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