import { ProposalEventStore } from "./ProposalEventStore";
import { UserStore } from "./UserStore";
import { UserServiceInstance } from '../services/UserService';
import { ProposalEventServiceInstance } from "../services/ProposalEventService";
import { HelpEventStore } from "./HelpEventStore";
import { HelpEventServiceInstance } from "../services/HelpEventService";
import { AdminStore } from "./AdminStore";
import { ComplaintServiceInstance } from "../services/ComplaintService";


export class RootStore {
  
    userStore: UserStore;
    adminStore: AdminStore;
    proposalEventStore: ProposalEventStore;
    helpEventStore: HelpEventStore;
  
    constructor() {
      this.userStore = new UserStore(UserServiceInstance); 
      this.adminStore = new AdminStore(UserServiceInstance, ComplaintServiceInstance); 
      this.proposalEventStore = new ProposalEventStore(ProposalEventServiceInstance, ComplaintServiceInstance);
      this.helpEventStore = new HelpEventStore(HelpEventServiceInstance, ComplaintServiceInstance)
    }
}