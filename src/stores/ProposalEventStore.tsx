import { action, makeAutoObservable } from 'mobx';
import { ProposalEventServiceInstance } from '../services/ProposalEventService';
import { IProposalEventBasic } from '../types/ProposalEventBasic';

export class ProposalEventStore {
    // event: IUser | null = null;
    // events: INotification[] | null = null;
    isLoading: boolean = false;
    isError: boolean = false;
    errorMessage: string = '';

    constructor(){
        makeAutoObservable(this);
    } 

    createEvent = async (event: IProposalEventBasic): Promise<void> => {
        try{
            this.startOperation();
            const createdEvent = await ProposalEventServiceInstance.createEvent(event);
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