import express from "express";
const router  = express.Router();
import patientService from "../services/patientService";
import utils from "../utils";

router.get("/",(_req,res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.get("/:id",(req,res) => {
    const {id} = req.params;
    try{
        const newPatient = patientService.getPatientById(id);
        res.send(newPatient);
    } catch(e: unknown) {
        let errMsg;
        if(e instanceof Error){
            errMsg = e.message;
        }
        res.status(404).json({message: errMsg});
    }
});

router.post("/",(req,res) => {
    try{
        const newPatientEntry = utils.toNewPatient(req.body);
        const newPatient = patientService.addPatient(newPatientEntry);
        res.send(newPatient);
    } catch(e:unknown) {
        let errMsg = "Something went wrong, ";
        if(e instanceof Error) {
            errMsg += e.message;
        }
        res.status(400).json({error: errMsg});
    }
});



export default router;