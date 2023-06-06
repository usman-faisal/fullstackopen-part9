import {NewNote, Note} from "../types";
import axios, {AxiosError} from "axios";

const BASE_URL = "http://localhost:3001/api/diaries";
const getAllNotes = () => {
    return axios.get(BASE_URL).then(res => res.data as Note[]);
}

const createNewNote = async(object: NewNote) => {
    try {
        const response = await axios.post<Note>(BASE_URL,object);
        return response.data as Note;
    }catch(e: unknown) {
        if(axios.isAxiosError(e)){
            throw new Error(e.response ? e.response.data : e.message);
        }
        console.log(e);
    }
}


export default {
    getAllNotes,
    createNewNote
}