import './App.css'
import Login from './pages/Login'
import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './pages/ProtectedRoute'
import Loader from './pages/Loader'

function App() {

  return (
    <>
    {/* <Loader/>     */}
    <Routes>
      <Route path='/' element={<Login/>} />   
      <Route path='/dashboard' element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>} /> 
    </Routes>
    </>
  )
}

export default App
