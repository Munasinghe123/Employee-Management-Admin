import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './Components/Header'
import Landing from './Pages/OpenRoutes/LandingPage'
import Login from './Pages/OpenRoutes/Login'
import Register from './Pages/OpenRoutes/Register'
import Footer from './Components/Footer'
import Dashboard from './Pages/ProtectedRoutes/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        <Header />

        {/* Page Content */}
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* protected */}
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App
