import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Signup from './components/registration/Signup'
import { Route, Routes, BrowserRouter, Navigate, Link } from "react-router-dom"
import Signin from './components/registration/Signin'
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'
import TaskManager from './pages/taskmanagement/TaskManager'
import { useSelector } from 'react-redux'

function App() {
  const { auth } = useSelector((state) => ({ ...state }));
  const { currentUser } = auth;
  console.log(currentUser, "route");
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={currentUser != null ? <Navigate to="/dashboard" /> : <Signin />} />
          <Route path="/dashboard" element={currentUser != null ? <Dashboard /> : <Navigate to="/signin" />} />
          <Route path="/taskmanager" element={currentUser != null ? <TaskManager /> : <Navigate to="/signin" />} />
          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
