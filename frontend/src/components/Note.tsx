import { Card } from "react-bootstrap"
import { Note as NoteModel } from "../models/note"
import styleNote from "../styles/Note.module.css"
import { formatDate } from "../utils/formatDate"
import styleUtils from "../styles/utils.module.css"
import { MdDelete } from "react-icons/md"

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel)=>void,
    onDeleteNoteClicked: (note: NoteModel) => void,
    className?: string
}

function Note({ note, onDeleteNoteClicked, className, onNoteClicked }: NoteProps){
    const { title, text, createdAt, updatedAt } = note

    let createdUpdatedText:string
    if(updatedAt > createdAt) {
        createdUpdatedText = `Updated: ${formatDate(updatedAt)}`
    } else {
        createdUpdatedText = `Created: ${formatDate(createdAt)}`
    }

    return (
        <Card className={`${styleNote.noteCard} ${className}`}
        onClick={()=>onNoteClicked(note)}
        >
           <Card.Body className={styleNote.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete 
                    className="text-muted ms-auto"
                    onClick = {(e) => {
                        onDeleteNoteClicked(note)
                        e.stopPropagation()
                    }}
                    />
                </Card.Title>
                <Card.Text className={styleNote.cardText}>
                    {text}
                </Card.Text>
           </Card.Body>
           <Card.Footer className="text-muted">
             {createdUpdatedText}       
            </Card.Footer>
        </Card>
    )
}

export default Note