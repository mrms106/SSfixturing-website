import { useState,useEffect } from 'react'
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
import Navbar from './components/includes/navbar';
import BillMain from './components/bill/billMain';

function App() {

  let[isloggedIn,setisloggedIn]=useState(false)
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
      setisloggedIn(true)
      console.log('Current User:', userData);
      return userData; 
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null; 
    }
  };
  useEffect(() => {
    currUser();
  }, []);

  return (
    <>
    <Navbar isloggedIn={isloggedIn} setisloggedIn={setisloggedIn}></Navbar>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contactus" element={<ContactUs />} />

          <Route path="/assemblyFixture" element={<Assembly />} />
          <Route path="/HydraulicFixture" element={<Hydraulic />} />
          <Route path="/HydralicPowerPack" element={<HydraulicPowerPack />} />
          <Route path="/MechanicalFixture" element={<Mechanical />} />
          <Route path="/WeldingFixture" element={<Welding />} />

          {isloggedIn?
          <Route path="/upload" element={<BillMain />} />:
          <Route path="/login" element={<Login />} />
            }
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
