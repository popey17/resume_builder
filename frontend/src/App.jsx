import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import Nav from './components/main/Nav'
import { ToastContainer } from 'react-toastify';
import { useAuthStore } from './store/AuthStore'
import { useEffect } from 'react'
import EmailVerification from './pages/EmailVerification'
import Create from './pages/Create'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (isAuthenticated && user) {
    return children;
  }
  return <Navigate to="/login" replace />
}

const DirectVerifiedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (isAuthenticated && user && user.isVerified) {
    return <Navigate to="/dashboard" replace />
  }
  return children;
}

const RedirectAuthUsers = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (isAuthenticated && user) {
    return <Navigate to="/" replace />
  }
  return children;
}

function App() {
  const { checkIsAuthenticated , user } = useAuthStore();

  useEffect(() => {
    checkIsAuthenticated();
  }, [checkIsAuthenticated])


  console.log(user);
  

  return (

    <>
      <Nav />
      <ToastContainer />
      <Routes>
        <Route path="/" element={
          <Home />
        } />
        <Route path="/login" element={
          <RedirectAuthUsers>
            <Login />
          </RedirectAuthUsers>
        } />
        <Route path="/register" element={
          <RedirectAuthUsers>
            <Register />
          </RedirectAuthUsers>
        } />
        <Route path="/password-reset" element={
          <RedirectAuthUsers>
            <ForgetPassword />
          </RedirectAuthUsers>
        } />
        <Route path="/verify-email" element={
          <DirectVerifiedUser>
            <EmailVerification />
          </DirectVerifiedUser>
        } />
        <Route path="/resume/create" element={
            <Create />
        } />
      </Routes>
    </>
  )
}

export default App
