import { Container, Navbar, Nav } from "react-bootstrap"
import { User } from "../models/user"
import NavBarLoggedInView from "./NavBarLoggedInView"
import NavBarLoggedOutView from "./NavBarLoggedOutView"
import { Link } from "react-router-dom"

interface NavBarProps {
    loggedInUser: User | null
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutClicked: () => void,
    onLogoutSuccessiful: () => void

}

const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogoutClicked, onLogoutSuccessiful}:NavBarProps) => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                <Nav>
                        Cool Notes App
                </Nav>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to="/privacy">
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser
                        ? <NavBarLoggedInView user={loggedInUser}  onLogoutSuccessiful={onLogoutSuccessiful}/> 
                        : <NavBarLoggedOutView  onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar