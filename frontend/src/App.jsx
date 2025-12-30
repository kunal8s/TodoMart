import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Homepage from './pages/Homepage.jsx'
import Signin from './pages/Signin.jsx'
import SignUp from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
