import { UnitEnum } from "../enums/UnitEnum";

export class NeedRequestResource{
    id?: number;
    title?: string;
    amount?: number;
    receivedTotal?: number;
    received?: number = 0;
    unit?: string;

    constructor(){
        this.id = 1;
        this.title = "Item 1";
        this.amount = 1;
        this.unit = UnitEnum.item;
    }
}