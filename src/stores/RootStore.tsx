import { ProposalEventStore } from "./ProposalEventStore";
import { UserStore } from "./UserStore";
import { UserServiceInstance } from '../services/UserService';
import { ProposalEventServiceInstance } from "../services/ProposalEventService";


export class RootStore {
  
    userStore: UserStore;
    proposalEventStore: ProposalEventStore;
  
    constructor() {
      this.userStore = new UserStore(UserServiceInstance); 
      this.proposalEventStore = new ProposalEventStore(ProposalEventServiceInstance);
    }
}