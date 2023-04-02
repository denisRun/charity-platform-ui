export class EventTypeEnum {
    static readonly proposal = "proposal-event";
    static readonly help = "help-event";

    static toContentString(status?:string): string {
      let result: string = "None";
      switch(status) { 
          case this.proposal: { 
             result = "Help Event";
             break; 
          } 
          case this.help: { 
              result = "Suggestion Event";
              break; 
          }
       } 
      return result;
  }

  static toUrlText(status?:string): string {
    let result: string = "propositions";
    switch(status) { 
        case this.proposal: { 
           result = "propositions";
           break; 
        }
        case this.help: { 
            result = "help";
            break; 
        }
     } 
    return result;
}
}