
import './App.css'
import Home from './pages/home/Home'
// eslint-disable-next-line no-unused-vars
import Login from './pages/login/Login'
// eslint-disable-next-line no-unused-vars
import SignUp from './pages/signup/Signup'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {

  const {authUser} = useAuthContext();

  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center '>
        <Routes>
          <Route path='/' element={authUser? <Home/> : <Navigate to='/login'/> }/>
          <Route path='/login' element={authUser? <Navigate to='/'/> : <Login/>}/>
          <Route path='/signup' element={authUser? <Navigate to='/'/> : <SignUp/>}/>

        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App
