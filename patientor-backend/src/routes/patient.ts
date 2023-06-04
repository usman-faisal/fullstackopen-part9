import express from "express";
const router  = express.Router();
import patientService from "../services/patientService";
import toNewPatient from "../utils";

router.get("/",(_req,res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post("/",(req,res) => {
    try{
        const newPatientEntry = toNewPatient(req.body);
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