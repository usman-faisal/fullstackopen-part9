import React, {Dispatch} from 'react';
import {Note} from "../types";
interface NotesListProps  {
    notes: Note[];
}

const NotesList = (props: NotesListProps) => {
    const {notes} = props;

    return (
        <div>
            <h1>Diaries</h1>
            {notes.map(note => {
                return <div key={note.id}>
                    <p>
                        <b>{note.date}</b>
                    </p>
                    <p>{note.weather}</p>
                    <p>{note.visibility}</p>
                </div>
            })}
        </div>
    );
};

export default NotesList;
