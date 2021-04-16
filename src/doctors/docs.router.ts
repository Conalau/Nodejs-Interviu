import express, {Request, Response, text}  from "express";
import * as DocService from "./docs.service";
import {BaseDoc, Doc} from "./doc.interface"
import { count } from "node:console";

export const docsRouter = express.Router();

let arr: number[] = [];

function countInArray(array: number[], nr: number) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === nr) {
            count++;
        }
    }
    return count;
}

docsRouter.post("/add-doctor", async (req: Request, res: Response)=> {
    try {
        const doc : BaseDoc = req.body
        const newDoc = await DocService.create(doc);
        arr.push(doc.id);
        console.log(arr);
        if(countInArray(arr, doc.id) >= 2 ) {
            throw new Error('Error !! This id already exists');
        } else {
            if(doc.id != null && doc.resourceType == "Practioner"){
                if(doc.active == true) {
                    console.log(`Doctor name:${JSON.stringify(doc.name)} and doctor facility:${JSON.stringify(doc.facility)}`);
                }
            } else {
                throw new Error("Error !! Id is not entered or resourceType is not Practioner");
            }
        }
        res.status(201).json(newDoc);
    } catch (e) {
        res.status(500).send(e.message);
    }
});