import axios, {isAxiosError} from "axios";
import {Entry, NewEntry, Patient, PatientFormValues} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getPatientById = async(id: string) => {
  const {data} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
  return data;
}

const addEntry = async(id: string, object: NewEntry) => {
  try{
    const {data} = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`,object);
    return data;
  }catch(e: unknown) {
    if(isAxiosError(e)){
      throw new Error(e.message);
    }
    console.log(e);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create,getPatientById,addEntry
};

