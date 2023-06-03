import express from "express";
const router  = express.Router();
import patientService from "../services/patientService";

router.get("/",(_req,res) => {
    res.send(patientService.getNonSensitivePatients());
});

export default router;