import express from "express";
const router  = express.Router();
import diagnoseService from "../services/diagnoseService";

router.get("/",(_req,res) => {
    res.send(diagnoseService.getAllDiagnoses());
});

export default router;