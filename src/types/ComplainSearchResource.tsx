export class IComplainSearchResource{
    complaints?: IComplainResource[]

    constructor(){
        this.complaints = []
    }
}

export class IComplainResource{
    creationDate?: Date;
    creatorID?: number;
    eventID?: number;
    eventName?: string;
    eventType?: string;
    complaints?:  IComplain[]
};

export class IComplain{
    creationDate?: Date;
    description?: string;
}