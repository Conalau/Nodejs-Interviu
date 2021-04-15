import express, {Request, Response, text}  from "express";
import * as DocService from "./docs.service";
import {BaseDoc, Doc} from "./doc.interface"

export const docsRouter = express.Router();

docsRouter.post("/add-doctor", async (req: Request, res: Response)=> {
    try {
        const doc : BaseDoc = req.body
        const newDoc = await DocService.create(doc);
        if(doc.active == true) {
            console.log(`Doctor name:${JSON.stringify(doc.name)} and doctor facility:${JSON.stringify(doc.facility)}`);
        }
        res.status(201).json(newDoc);
    } catch (e) {
        res.status(500).send(e.message);
    }
});