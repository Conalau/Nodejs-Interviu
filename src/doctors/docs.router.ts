import express, {Request, Response, text}  from "express";
import * as DocService from "./docs.service";
import {BaseDoc, Doc} from "./doc.interface"
import { count } from "node:console";
import fs from "fs";
import parse from "csv-parser";

export const docsRouter = express.Router();

let arr: number[] = [];



const csvFile = "./nodejs.csv";

function countInArray(array: number[], nr: number) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
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

docsRouter.post("/doctors", async(req: Request, res:Response) => {
        let arrDoctors : any[] = [];
        fs.createReadStream(csvFile).on('error', () => {
            throw new Error('Error');
        })
        .pipe(parse())
        .on('data', (row) => {
            if(arrDoctors.filter(e => e.ID == row.ID).length > 0){
                if(arrDoctors.filter(e => e.FamilyName == row.FamilyName).length > 0 && arrDoctors.filter(e => e.GivenName == row.GivenName).length > 0){
                    if(arrDoctors.filter(e => e.Active == true)) {
                       let doc = arrDoctors.find(elem => elem.ID == row.ID);
                        if(doc.NameId.toLowerCase().search(row.NameId.toLowerCase()) == -1){
                            doc.NameId += ' ,' + row.NameId;
                        } 
                    }
                }  else {
                    throw new Error("Error! A doctor have an id that is already assigned")
                }
            } else {
                arrDoctors.push(row);
            }
        })
        .on('end', () => {
            console.log(arrDoctors);
        })
})