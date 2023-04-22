export class OwnerRequestStatusEnum {
    static readonly notStarted = "not_started";
    static readonly inProgress = "in_progress";
    static readonly completed = "completed";
    static readonly aborted = "aborted";

    static toContentString(status?:string): string {
        let result: string = "None";
        switch(status) { 
            case this.notStarted: { 
               result = "Not Started";
               break; 
            } 
            case this.inProgress: { 
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
         } 
        return result;
    }
  }