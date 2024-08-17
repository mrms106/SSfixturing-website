import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home'
import Hydra from './components/fixtures/welding'
import Login from './components/user/login'
import Assembly from './components/fixtures/assembly'
import Hydraulic from './components/fixtures/hydraulic'
import HydraulicPowerPack from './components/fixtures/hydraulicpp'
import Mechanical from './components/fixtures/mechanical'
import Welding from './components/fixtures/welding';

function App() {
  

  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
