import { Button, Navbar } from "react-bootstrap"
import { User } from "../models/user"
import * as NoteApi from "../network/notes_api"
interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessiful: () => void
}

const NavBarLoggedInView = ({user,onLogoutSuccessiful}:NavBarLoggedInViewProps) => {
    
    async function logout() {
        try {
            await NoteApi.logout()
            onLogoutSuccessiful()
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
    
    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as {user.username}
            </Navbar.Text>
            <Button onClick={logout}>Logout</Button>
        </>
    )
}

export default NavBarLoggedInView