import {Entry, NewEntry} from "../types";
import { v4 as uuid } from 'uuid';
import patients from "../../data/patients";

const addEntry = (id: string,object: NewEntry):Entry => {
    const newEntryId = uuid();
    const paitent = patients.find(p => p.id === id);
    if(paitent){
        return {
            id: newEntryId,
            ...object
        };
    }
    throw new Error("Patient can not be found");
};

export default {
    addEntry,
};