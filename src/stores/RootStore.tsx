import { ProposalEventStore } from "./ProposalEventStore";
import { UserStore } from "./UserStore";
import { UserServiceInstance } from '../services/UserService';
import { ProposalEventServiceInstance } from "../services/ProposalEventService";
import { HelpEventStore } from "./HelpEventStore";
import { HelpEventServiceInstance } from "../services/HelpEventService";


export class RootStore {
  
    userStore: UserStore;
    proposalEventStore: ProposalEventStore;
    helpEventStore: HelpEventStore;
  
    constructor() {
      this.userStore = new UserStore(UserServiceInstance); 
      this.proposalEventStore = new ProposalEventStore(ProposalEventServiceInstance);
      this.helpEventStore = new HelpEventStore(HelpEventServiceInstance)
    }
}