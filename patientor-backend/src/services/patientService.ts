import patients from "../../data/patients";
import {NonSensitivePatient, Patient} from "../types";

const getAllPatients = ():Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id,gender,name,dateOfBirth,occupation}) => {
        return {
            id,
            gender,
            name,
            dateOfBirth,
            occupation,
        };
    });
};

export default {
    getNonSensitivePatients,
    getAllPatients
};