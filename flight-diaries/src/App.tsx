import {useEffect, useState} from "react";
import {Note} from "./types";
import NotesList from "./components/NotesList";
import noteService from "./services/note"
import NoteForm from "./components/NoteForm";

const App = () => {
    const [notes,setNotes] = useState<Note[]>([]);
    const [notification,setNotification] = useState("");
    useEffect(() => {
        noteService.getAllNotes().then(res => {
            setNotes(res);
        })
    },[])
    return (
        <div>
            {notification && <p>{notification}</p>}
            <NoteForm setNotification={setNotification} setNotes={setNotes}/>
            <NotesList notes={notes} />
        </div>
    );
};

export default App;
