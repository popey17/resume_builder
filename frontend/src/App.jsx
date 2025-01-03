import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPassword from './pages/ForgetPassword'
import Nav from './components/main/Nav'
function App() {

  return (
    <>
      <Nav />
      <div className='mt-[65px]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ForgetPassword />} />
        </Routes>
      </div>
    </>
  )
}

export default App
