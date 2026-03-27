import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Header from './Components/Header';
import Landing from './Pages/OpenRoutes/LandingPage';
import Login from './Pages/OpenRoutes/Login';
import Register from './Pages/OpenRoutes/Register';
import Footer from './Components/Footer';

import ProtectedRoute from './Pages/ProtectedRoutes/ProtectedRoute';


import DashboardLayout from './Layouts/Dashboard';
import Attendance from './Pages/ProtectedRoutes/Attendence';
import Employees from './Pages/ProtectedRoutes/Employees';
import Settings from './Pages/ProtectedRoutes/Settings';

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

      {!user && <Header />}

      <main className="flex-1 flex flex-col">
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/*  PROTECTED DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >

            {/* Default redirect */}
            <Route index element={<Navigate to="attendance" />} />

            {/* Pages */}
            <Route path="attendance" element={<Attendance />} />
            <Route path="employees" element={<Employees />} />
            <Route path="settings" element={<Settings />} />

          </Route>

        </Routes>
      </main>

      {!user && <Footer />}

    </div>
  );
}

export default App;