import React, {useState} from 'react';
import {Button, MenuItem, Select, TextField} from "@mui/material";
import {Entry, EntryTypes, NewEntry, Patient} from "../../types";
import patientService from "../../services/patients"
import {useParams} from "react-router-dom";

interface NewEntryFormProps {
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>
}
const NewEntryForm = (props: NewEntryFormProps) => {
    const [selectedType, setSelectedType] = useState<EntryTypes>(EntryTypes.Hospital);
    const [description, setDescription] = useState("");
    const [date,setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [diagnosisCode, setDiagnosisCode] = useState<string>("");
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<string>>([]);
    const [healthCheckRating, setHealthCheckRating] = useState(0);
    const [discharge, setDischarge] = useState({
        date: "",
        criteria: ""
    });
    const {id} = useParams();
    function addDiagnosisCode(){
        if(diagnosisCode){
            setDiagnosisCodes([...diagnosisCodes,diagnosisCode])
        }
    }
    async function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();
        const baseEntry = {
            type: selectedType,
            description,
            date,
            specialist,
            diagnosisCodes,
        }
        let extendedObj = {};
        switch (selectedType){
            case EntryTypes.OccupationalHealthcare:
                extendedObj = {employerName};
                break;
            case EntryTypes.HealthCheck:
                extendedObj = {healthCheckRating};
                break;
            case EntryTypes.Hospital:
                extendedObj = {discharge};
                break;
        }
        try{
            const newEntry = await patientService.addEntry(id as string,{...baseEntry,...extendedObj} as NewEntry)
            console.log(newEntry);
            props.setPatient(prevState=> {
                return {
                    ...prevState,
                    entries: prevState?.entries.concat(newEntry as Entry)
                } as Patient;
            });
        }catch(e) {
            console.log(e);
        }


    }
    const [employerName, setEmployerName] = useState("");
    const renderFields = () => {
        switch (selectedType) {
            case EntryTypes.HealthCheck:
                return <>
                    <TextField label="Health check rating" value={healthCheckRating} type="number" onChange={(e) => setHealthCheckRating(Number(e.target.value))} />
                </>
            case EntryTypes.Hospital:
                return <>
                    <TextField type="date" label="discharge date" value={discharge.date} onChange={(e) => setDischarge({...discharge,date: e.target.value})} />
                    <TextField value={discharge.criteria} label="discharge criteria" onChange={(e) => setDischarge({...discharge,criteria: e.target.value})} />
                </>
            case EntryTypes.OccupationalHealthcare:
                return <>
                    <TextField label="Employer name" value={employerName} onChange={(e) => setEmployerName(e.target.value)}/>
                </>
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value as EntryTypes)}>
                    {Object.values(EntryTypes).map(e => {
                        return <MenuItem key={e} value={e}>{e}</MenuItem>
                    })}
                </Select>
                <TextField label="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <TextField label="date" value={date} type="date" onChange={(e) => setDate(e.target.value)}/>
                <TextField label="specialist" value={specialist}   onChange={(e) => setSpecialist(e.target.value)}/>
                <TextField label="diagnosisCodes" value={diagnosisCode} onChange={(e) => setDiagnosisCode(e.target.value)}/>
                <Button onClick={addDiagnosisCode} type="button">Add code</Button>
                {renderFields()}
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default NewEntryForm;
