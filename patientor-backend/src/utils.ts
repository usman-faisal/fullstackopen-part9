import {Gender, NewPatientEntry} from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
};

const parseText = (text: unknown): string => {
    if(!text || !isString(text)) {
        throw new Error("invalid or missing text " + text);
    }
    return text;
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

const toNewPatient = (object: unknown): NewPatientEntry => {
    if(!object || typeof object !== 'object') {
        throw new Error("invalid or missing data");
    }
    if('name' in object && 'occupation' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object) {
        return {
            ssn: parseText(object.ssn),
            name: parseText(object.name),
            occupation: parseText(object.occupation),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender)
        };
    }
    throw new Error("invalid data");
};

export default toNewPatient;
