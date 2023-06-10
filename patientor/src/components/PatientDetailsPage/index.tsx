import React, {useEffect, useState} from 'react';
import {Diagnosis, Entry, Patient} from "../../types";
import {Divider, Typography} from "@mui/material";
import patientService from "../../services/patients"
import diagnosisService from "../../services/diagnosis"
import {useParams} from "react-router-dom";
import EntryDetails from "./EntryDetails";
import NewEntryForm from "./NewEntryForm";



const PatientDetailsPage = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnosis,setDiagnosis] = useState<Diagnosis[]>([]);
    const {id} = useParams();
    useEffect(() => {
        patientService.getPatientById(id as string).then(res => {
            console.log(res);
            setPatient(res as Patient);
            diagnosisService.getAll().then(res => {
                setDiagnosis(res)
            })
        });

    },[])
    if(!patient){
        return null;
    }
    const renderDiagnosisCodeName = (code: string) => {
        return diagnosis.find(c => c.code === code);
    }
    return (
        <div>
            <Typography component="h4" variant="h4">{patient.name} ({patient.gender})</Typography>
            <p>ssh: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <NewEntryForm setPatient={setPatient} />
            <Divider />
            <br/>
            <Typography variant="h6">
                Entry
            </Typography>
            {patient.entries.map(entry => {
                return <div key={entry.id}>
                    <p>{entry.date} {entry.description}</p>
                    <ul>
                        {entry?.diagnosisCodes?.map(code => {
                            return <li>
                                {code} {renderDiagnosisCodeName(code) && renderDiagnosisCodeName(code)?.name}
                            </li>
                        })}
                    </ul>
                    <EntryDetails entry={entry} />
                </div>
            })}
        </div>
    );
};

export default PatientDetailsPage;
