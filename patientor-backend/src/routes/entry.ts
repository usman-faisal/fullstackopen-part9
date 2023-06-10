import express from "express";
import {Request} from "express";

const router = express.Router({mergeParams: true});
import utils from "../utils";
import entryService from "../services/entryService";

interface ChildRequest extends Request {
    params: {
        id: string;
    }
}

router.post("/",(req:ChildRequest,res) => {
    const id = req.params.id;
    try{
        const newEntryObject = utils.toNewEntry(req.body);
        const newEntry = entryService.addEntry(id,newEntryObject);
        res.send(newEntry);
    }catch(e){
        let errMsg = "Something went wrong ";
        if(e instanceof Error){
            errMsg += e.message;
        }
        res.send(errMsg);
    }
});

export default router;