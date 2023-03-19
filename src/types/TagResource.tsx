export class ITagResource{
    title?: string;
    values?: string[];

    constructor(title:string, values: string[]){
        this.title = title;
        this.values = values;
    }
}