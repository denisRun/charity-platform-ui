export class INotificationResource{
    id?: string;
    
    eventID?: string;
    eventType?: string;
    eventTitle?: string

    createdAt?: Date;
    newStatus?: string;
    isRead?: boolean;
    text?: string;
}