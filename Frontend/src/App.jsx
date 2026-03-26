import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

import Header from './Components/Header'
import Landing from './Pages/OpenRoutes/LandingPage'
import Login from './Pages/OpenRoutes/Login'
import Register from './Pages/OpenRoutes/Register'
import Footer from './Components/Footer'
import Dashboard from './Pages/ProtectedRoutes/Dashboard'
import ProtectedRoute from './Pages/ProtectedRoutes/ProtectedRoute'

function App() {

  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen flex flex-col">
      {
        !user && <Header />
      }


      {/* Page Content */}
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>

      {
        !user && <Footer />
      }


    </div>

  )
}

export default App
