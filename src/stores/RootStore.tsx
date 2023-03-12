import { ProposalEventStore } from "./ProposalEventStore";
import { UserStore } from "./UserStore";

export class RootStore {
    userStore: UserStore;
    proposalEventStore: ProposalEventStore;
  
    constructor() {
      this.userStore = new UserStore(); 
      this.proposalEventStore = new ProposalEventStore();
    }
}