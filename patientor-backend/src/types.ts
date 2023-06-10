export enum Gender {
  Male = "male",
    Female = "female",
    Other = "other"
}


export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Diagnose['code'][];
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: number;
}
export interface OccupationalHealthcareEntry extends BaseEntry{
    type: 'OccupationalHealthcare',
    employerName: 'FBI',
}

export interface  HospitalEntry extends BaseEntry     {
    type: 'Hospital',
    discharge: {
        date: string,
        criteria: string,
    },
}

export type EntryTypes = "HealthCheck"|"OccupationalHealthcare"|"Hospital";

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = UnionOmit<Entry, "id">;

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name:  string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NewPatientEntry = Omit<Patient,"id">;

export type NonSensitivePatient = Omit<Patient,"ssn" | "entries">;