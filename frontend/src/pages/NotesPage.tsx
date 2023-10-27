import { Container } from "react-bootstrap"
import NotePageLoggedInView from "../components/NotePageLoggedInView"
import NotePageLoggedOutView from "../components/NotePageLoggedOutView"
import styleNotesPage from '../styles/NotesPage.module.css'
import { User } from "../models/user"

interface NotesPageProps {
    loggedInUser: User|null
}

export const NotesPage = ({ loggedInUser}: NotesPageProps) => {
    return (
        <Container className={styleNotesPage.notesPage}>
        <>
        {
            loggedInUser
            ? <NotePageLoggedInView />
            : <NotePageLoggedOutView />
        }
        </>
        </Container>
    )
}