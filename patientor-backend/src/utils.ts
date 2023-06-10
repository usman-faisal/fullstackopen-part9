import {
    Diagnose,
    Entry,
    EntryTypes,
    Gender,
    HealthCheckEntry,
    HospitalEntry,
    NewEntry,
    NewPatientEntry, OccupationalHealthcareEntry
} from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
};

const parseText = (text: unknown): string => {
    if(!text || !isString(text)) {
        throw new Error("invalid or missing text " + text);
    }
    return text;
};

const isNumber = (n: unknown): n is number => {
    return typeof n === 'string';
};

const parseNumber = (number: unknown): number => {
    if(!number || !isNumber(number)){
        throw new Error("invalid or missing number " + number);
    }
    return number;
};

const isDate = (date: string): boolean => {
    return Boolean(new Date(date));
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error("invalid or missing date " + date);
    }
    return date;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).some(item => item.includes(gender));
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("invalid or missing gender " + gender);
    }
    return gender;
};

const parseEntries = (entry: unknown) => {
    if(Array.isArray(entry)){
        const isEntry = entry.every(e => {
            if(e.type && isString(e.type)){
                return ["HealthCheck","OccupationalHealthcare","Hospital"].includes(e.type as string);
            }
            return false;
        });
        if(isEntry){
            return entry as Entry[];
        }
    }
    throw new Error("invalid data");
};

const toNewPatient = (object: unknown): NewPatientEntry => {
    if(!object || typeof object !== 'object') {
        throw new Error("invalid or missing data");
    }
    if('name' in object && 'occupation' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'entries' in object && Array.isArray(object.entries)) {

        return {
            ssn: parseText(object.ssn),
            name: parseText(object.name),
            occupation: parseText(object.occupation),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            entries: parseEntries(object.entries),
        };
    }
    throw new Error("invalid data");
};
const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnose['code']>;
    }

    return object.diagnosisCodes as Array<Diagnose['code']>;
};

const parseEntry = (e: unknown): EntryTypes => {
    if(e && isString(e)){
        if(["HealthCheck","OccupationalHealthcare","Hospital"].includes(e)){
            return e as EntryTypes;
        }
    }
    throw new Error("invalid entry type " + e);
};

const parseDischarge = (object: unknown): {date: string,criteria: string} => {
    if(!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
        throw new Error("invalid or missing discharge " + object);
    }
    return {
        date: parseDate(object.date),
        criteria: parseText(object.criteria),
    };

};

const toNewEntry = (object: unknown): NewEntry => {
    if(!object || typeof object !== 'object'){
        throw new Error("invalid or missing data");
    }
    if('type' in object && 'description' in object && 'date' in object && 'specialist' in object && 'diagnosisCodes' in object){
        const baseObj = {
            description: parseText(object.description),
            date: parseDate(object.date),
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type: parseEntry(object.type),
            specialist: parseText(object.specialist),
        };
        switch (baseObj.type) {
            case "HealthCheck":
                if('healthCheckRating' in object)
                return {...baseObj,healthCheckRating: parseNumber(object.healthCheckRating)} as HealthCheckEntry;
                else throw new Error("invalid or missing");
            case "Hospital":
                if('discharge' in object){
                    return {...baseObj,discharge: parseDischarge(object.discharge)} as HospitalEntry;
                }
                else throw new Error("invalid or missing");
            case "OccupationalHealthcare":
                if('employerName' in object){
                    return {...baseObj,employerName: parseText(object.employerName)} as OccupationalHealthcareEntry;
                }
        }
    }
    throw new Error("invalid or missing data" + JSON.stringify(object));
};

export default {
    toNewPatient,
    toNewEntry
};
