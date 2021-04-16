export interface BaseDoc {
    [x: string]: any;
    resourceType : string;
    name : [{family : string, given : [string], text : string}];
    facility : Array<Facility>;
    active : boolean;
}

export interface Doc extends BaseDoc {
    id : number;
}

export interface Facility {
    value : number;
    system : string;
    name : string ;
}