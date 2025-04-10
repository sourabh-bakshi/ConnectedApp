import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>} />   
      <Route path='/dashboard' element={<Dashboard/>} /> 
    </Routes>
    </>
  )
}

export default App
