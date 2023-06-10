import React from 'react';
import {Entry} from "../../types";
import {assertNever} from "../../utils";

interface EntryDetailsProps  {
    entry: Entry
}
const EntryDetails = (props: EntryDetailsProps) => {
    const {entry} = props;
    switch (entry.type){
        case "HealthCheck":
            return <div>
                <p>Health check rating: {entry.healthCheckRating}</p>
            </div>
        case "Hospital":
            return <div>
                <p>Discharge date: {entry.discharge.date} Discharge criteria: {entry.discharge.criteria}</p>
            </div>
        case "OccupationalHealthcare":
            return <div>
                <p>Employer name: {entry.employerName}</p>
            </div>
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
