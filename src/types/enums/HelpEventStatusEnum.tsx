export class HelpEventStatusEnum {
    static readonly active = "active"
    static readonly inactive = "inactive";
    static readonly done = "done";
    static readonly blocked = "blocked";

    static toContentString(status?:string): string {
      let result: string = "None";
      switch(status) { 
          case this.active: { 
             result = "Active";
             break; 
          } 
          case this.inactive: { 
              result = "Inactive";
              break; 
          }
          case this.done: { 
              result = "Done";
              break; 
          }
          case this.blocked: { 
              result = "Blocked";
              break; 
          }
       } 
      return result;
  }
  }