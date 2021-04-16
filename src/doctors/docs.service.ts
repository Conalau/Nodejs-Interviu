/**
 * Data Model Interfaces
 */

import {BaseDoc, Doc } from "./doc.interface";
import { Docs } from "./docs.interface";

/**
 * In-Memory Databse
 */

let docs : Docs = {
    1 : {
        id : 1,
        resourceType : "Practioner",
        name :[{family : "TestFamily",
                given :["TestGiven"],
                text : "TestFamily TestGiven"}],
        facility : [{
            value : 1,
            system : "http://us.gov/NPI",
            name : "Facility Name"
        },
    {
            value : 2,
            system : "http://us.gov/NPI",
            name : "Other Facility name"

    }],
        active : true
    }
    };


/**
 * Service Methods
 */

export const create = async (newDoc : BaseDoc): Promise<Doc> => {
    const id = new Number().valueOf();
    docs[id] = {
        id,
       ...newDoc 
    };

    return docs[id];
}