import { useEffect, useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("a new note...")
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        noteService
            .getAll()
            .then(fetchedNotes => {
                setNotes(fetchedNotes)
            })
    }, [])

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }

        noteService
            .create(noteObject)
            .then(() => {
                setNotes(notes.concat(noteObject))
                setNewNote('')
            })
    }

    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(fetchedNote => {
                setNotes(notes.map(n => n.id !== id ? n : fetchedNote))
            })
            .catch(error => {
                alert(`the note '${note.content}' was already deleted from server`)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all' }</button>
            </div>
            <ul>
                {notesToShow.map(note => 
                <Note 
                    key={note.id}
                    note={note}
                    toggleImportance={() => toggleImportanceOf(note.id)}
                />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form> 
        </div>
    )
}

export default App