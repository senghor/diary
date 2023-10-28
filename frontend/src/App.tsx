import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as NoteApi from './network/notes_api';
import { Container } from 'react-bootstrap';
import { NotesPage } from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import styleApp from './styles/App.module.css'


function App() {
  
  const [loggedInUser, setLoggedInuser] = useState<User | null>(null)

  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NoteApi.getLoggedInUser()
        setLoggedInuser(user)
      } catch(error) {
        console.log(error)
      }
    }
    fetchLoggedInUser()
  },[])

  return (
    <BrowserRouter>
      <div>
        <NavBar 
            loggedInUser={loggedInUser}
            onLoginClicked={() => setShowLoginModal(true)}
            onSignUpClicked={() => setShowSignUpModal(true)}
            onLogoutClicked={() => {}}
            onLogoutSuccessiful={() => setLoggedInuser(null)}
        />
      <Container className={styleApp.pageContainer}>
        <Routes>
          <Route 
            path='/' 
            element={<NotesPage loggedInUser={loggedInUser} />}
          />
          <Route 
            path='/privacy'
            element={<PrivacyPage />}
          />
          <Route 
            path='/*'
            element={<NotFoundPage />}
          />
        </Routes>
      </Container>
      {showSignUpModal &&
        <SignUpModal
          onDismiss={() => {setShowSignUpModal(false)}}
          onSignUpSuccessiful={(user) => {
            setLoggedInuser(user)
            setShowSignUpModal(false)
          }}
        />

      }
      {showLoginModal && 
          <LoginModal
              onDismiss={() => {setShowLoginModal(false)}}
              onLoginSuccessiful={(user) => {
                setLoggedInuser(user)
                setShowLoginModal(false)
              }}
          />
      }
      </div>
    </BrowserRouter>
  )
}

export default App; 
