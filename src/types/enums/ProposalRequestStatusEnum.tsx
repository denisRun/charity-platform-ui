export class ProposalRequestStatusEnum {
    static readonly waiting = "waiting";
    static readonly accepted = "accepted";
    static readonly inProcess = "in_progress";
    static readonly completed = "completed";
    static readonly aborted = "aborted";
    static readonly canceled = "canceled";

    static toContentString(status?:string): string {
        let result: string = "None";
        switch(status) { 
            case this.waiting: { 
               result = "Waiting";
               break; 
            } 
            case this.accepted: { 
                result = "Accepted";
                break; 
             } 
            case this.inProcess: { 
                result = "In Progress";
                break; 
            }
            case this.completed: { 
                result = "Completed";
                break; 
            }
            case this.aborted: { 
                result = "Aborted";
                break; 
            }
            case this.canceled: { 
                result = "Canceled";
                break; 
            }    
         } 
        return result;
    }
  }