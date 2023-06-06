import React, {Dispatch, useState} from 'react';
import {NewNote, Note, Visibility, Weather} from "../types";
import noteService from "../services/note"

interface NoteFormProps {
    setNotes: Dispatch<React.SetStateAction<Note[]>>;
    setNotification: Dispatch<React.SetStateAction<string>>
}
const NoteForm = (props: NoteFormProps) => {
    const [date, setDate] = useState("");
    const [weather, setWeather] = useState<Weather>(Weather.Cloudy);
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Ok);
    const [comment, setComment] = useState("");
    async function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();
        const newNote: NewNote = {
            date,
            weather,
            visibility,
            comment
        }
        try {
            const response = await noteService.createNewNote(newNote);
            props.setNotes(prevState => [...prevState,response as Note])
        }catch(e) {
            if(e instanceof Error){
                props.setNotification(e.message);
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="date">Date</label>
                <input value={date} onChange={e => setDate(e.target.value)} type="date" id="date"/>
            </div>
            <div>
                <label>Weather: </label>
                {
                    Object.values(Weather).map(w => {
                        return (
                        <label key={w}>
                            {w}
                            <input name="weather" value={w} onChange={e => setWeather(e.target.value as Weather)} checked={w === weather} type="radio"/>
                        </label>
                        )
                    })
                }
            </div>
            <div>
                <label>Visibility: </label>
                {
                    Object.values(Visibility).map(v => {
                        return (
                            <label key={v}>
                                {v}
                                <input name="visibility" value={v} onChange={e => setVisibility(e.target.value as Visibility)} checked={v === visibility} type="radio"/>
                            </label>
                        )
                    })
                }
            </div>
            <div>
                <label htmlFor="comment">Comment</label>
                <input value={comment} onChange={e => setComment(e.target.value)} type="text" id="comment"/>
            </div>
            <button>Submit</button>
        </form>
    );
};

export default NoteForm;
