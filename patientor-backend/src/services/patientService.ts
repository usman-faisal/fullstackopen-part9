import patients from "../../data/patients";
import {NewPatientEntry, NonSensitivePatient, Patient} from "../types";
import { v4 as uuid } from 'uuid';
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

const addPatient = (object: NewPatientEntry): Patient => {
    const id: string = uuid(); 
    const newPatient: Patient =  {
        id,
        ...object
    };
    patients.push(newPatient);
    return newPatient;
};


export default {
    getNonSensitivePatients,
    getAllPatients,
    addPatient
};