import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './Components/Header'
import Landing from './Pages/OpenRoutes/LandingPage'
import Login from './Pages/OpenRoutes/Login'

function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
