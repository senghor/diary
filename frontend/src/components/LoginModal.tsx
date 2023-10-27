import { useForm } from "react-hook-form"
import { User } from "../models/user"
import { LoginCredentials } from "../network/notes_api"
import { Modal, Form, Button, Alert } from "react-bootstrap"
import * as NoteApi from "../network/notes_api"
import TextInputField from "./form/TextInputField"
import styleUtils from "../styles/utils.module.css"
import { useState } from "react"
import { UnAuthorizedError } from "../errors/http-errors"

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessiful: (user: User) => void
}

const LoginModal = ({onDismiss, onLoginSuccessiful}: LoginModalProps) => {

    const [errorText, setErrorText] = useState<string | null>(null)

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>()
    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await NoteApi.login(credentials)
            onLoginSuccessiful(user)
        } catch (error) {
            if (error instanceof UnAuthorizedError) {
                setErrorText(error.message)
            } else {
                alert(error)
            }
            console.log(error)
        }
    }
    
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
               <Modal.Title>
                    Login
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorText &&
                <Alert variant="danger">
                    {errorText}
                </Alert>
                }
                
            <Form onSubmit={handleSubmit(onSubmit)}> 
                <TextInputField
                    name="username"
                    label="Username"
                    type="text"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.username}
                />
                 <TextInputField
                    name="password"
                    label="Password"
                    type="password"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.password}
                />
                <Button className={styleUtils.width100} type="submit" disabled={isSubmitting}>
                       Login
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    )
}
 export default LoginModal