import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home'
import Login from './components/user/login'
import Assembly from './components/fixtures/assembly'
import Hydraulic from './components/fixtures/hydraulic'
import HydraulicPowerPack from './components/fixtures/hydraulicpp'
import Mechanical from './components/fixtures/mechanical'
import Welding from './components/fixtures/welding';
import SignUp from './components/user/signup';
import ContactUs from './components/contactUs/contactus';
function App() {
  
  const currUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/curruser", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const userData = await response.json();
      console.log('Current User:', userData);
      return userData; 
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null; 
    }
  };

  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home currUser={currUser}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contactus" element={<ContactUs />} />

          <Route path="/assemblyFixture" element={<Assembly />} />
          <Route path="/HydraulicFixture" element={<Hydraulic />} />
          <Route path="/HydralicPowerPack" element={<HydraulicPowerPack />} />
          <Route path="/MechanicalFixture" element={<Mechanical />} />
          <Route path="/WeldingFixture" element={<Welding />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
