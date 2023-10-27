import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../models/note";
import * as NoteApi from "../network/notes_api";
import styleNotesPage from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";
import styleNote from "../styles/Note.module.css"
import AddEditNoteDialog from "./AddEditNoteDialog";
import Note from "./Note";
import SignUpModal from "./SignUpModal";

const NotePageLoggedInView = () => {
    const [notes, setNotes] = useState<NoteModel[]>([])
    const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null)
    const [notesLoading, setNotesLoading] = useState(true)
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)
  
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)

    useEffect(()=>{
        async function loadNotes(){
          try {
            setShowNotesLoadingError(false)
            setNotesLoading(true)
           const notes = await NoteApi.fetchNotes() 
            setNotes(notes)
          } catch(error) {
            console.error(error)
            setShowNotesLoadingError(true)
          } finally {
            setNotesLoading(false)
    
          }
        }
        loadNotes() 
      }, [])
    
      async function deleteNote(note: NoteModel) {
        try {
          await NoteApi.deleteNote(note._id)
          setNotes(notes.filter(existingNote => existingNote._id !== note._id))
        } catch(error) {
          alert(error)
        }
    
      }
    
      const notesGrid = 
      <Row xs={1} md={2} x1={3} className = {`g-4 ${styleNote.notesGrid}`}>
      {notes.map(note => (
        <Col key = {note._id}>
          <Note 
          note={note} key = {note._id} 
          className={styleNotesPage.note} 
          onNoteClicked={setNoteToEdit}
          onDeleteNoteClicked={ async ()=>{
            await deleteNote(note)
          } }
          />
        </Col>
      ))}
      </Row>

    return (
        <>
            <Button className= {`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`} 
            onClick={()=>setShowAddNoteDialog(true)}>
                <FaPlus />
                Add new note
            </Button>
            {notesLoading && <Spinner animation='border' variant='primary' />}
            {showNotesLoadingError && <p>Something went wrong. Please refresh the page</p>}
            {!notesLoading && !showNotesLoadingError &&
            <>
            {
                notes.length > 0 ? notesGrid : <p> You don't have any notes yet</p>
            }
            </>
            }
            {showAddNoteDialog &&
                <AddEditNoteDialog onDismiss={()=>setShowAddNoteDialog(false)}
                onNoteSaved={(newNote)=>{
                setNotes([...notes,newNote])
                setShowAddNoteDialog(false)
                }}
                />
            }
            {
                noteToEdit && 
                <AddEditNoteDialog
                noteToEdit={noteToEdit}
                onDismiss={()=>setNoteToEdit(null)}
                onNoteSaved={(updatedNode)=>{
                setNotes(notes.map(existingNote => existingNote._id === updatedNode._id ? updatedNode : existingNote))
                setNoteToEdit(null)
                }} />
            }
            {false && 
                <SignUpModal
                    onDismiss={() => {}}
                    onSignUpSuccessiful={() => {}}
                />
            }
        </>
    )
}
export default NotePageLoggedInView