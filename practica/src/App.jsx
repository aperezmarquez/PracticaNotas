import { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Searcher from './componentes/Searcher.jsx'
import NoteList from './componentes/NoteList.jsx'

function App() {
  const [notes, setNotes] = useState([])

  const createNewNote = (tittle, text) => {
    const newNote = {
      id: nanoid(),
      tittle: tittle,
      text: text
    }

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  }

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('notes-data'));
  
    if (item) {
      setNotes(item)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes-data', JSON.stringify(notes));
  }, [notes]);

  const [noteName, setNoteName] = useState('');

  const handleDelete = (id) => {
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  }

  const handleEdit = (id, tittle, text) => {
    const changedNoteIndex = notes.findIndex((note) => note.id == id);
    
    if (changedNoteIndex != -1) {
      const changedNote = notes[changedNoteIndex];
      changedNote.tittle = tittle;
      changedNote.text = text;

      const newNotes = [...notes];
      newNotes[changedNoteIndex] = changedNote;

      setNotes(newNotes);
    }
  }
  
  return (
    <div className='app'>
      <h1 className='app-tittle'>LISTA DE NOTAS</h1>
      <Searcher setNoteName={setNoteName}/>
      <NoteList 
          notes={notes.filter((note) => note.tittle.toLowerCase().includes(noteName.toLowerCase()))} 
          createNote={createNewNote} 
          handleDelete={handleDelete}
          handleEdit={handleEdit}
      />
    </div>
  )
}

export default App
