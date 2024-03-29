export class EventTypeEnum {
    static readonly proposal = "proposal-event";
    static readonly help = "help";

    static toContentString(status?:string): string {
      let result: string = "None";
      switch(status) { 
          case this.proposal: { 
             result = "Suggestion";
             break; 
          } 
          case this.help: { 
              result = "Help";
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
            result = "helps";
            break; 
        }
     } 
    return result;
}
}