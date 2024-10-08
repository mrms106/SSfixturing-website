import { useState,useEffect } from 'react'
import PwaInstall from './components/pwa/pwaInstall';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import About from './components/NavRedirects/about';
import Potential from './components/NavRedirects/potential';
import Capabilities from './components/NavRedirects/capabilities';
import Pricing from './components/NavRedirects/pricing';
import ProtectedRoute from './components/protected';
import { Navigate } from 'react-router-dom';
import Error from './components/error';
import ScrollToTop from './components/ScrollTop';
import Loader from './components/loader';
function App() {

  let[isloggedIn,setisloggedIn]=useState(null)
  let [currentUser, setCurrentUser] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const currUser = async () => {
    try {
      const response = await fetch("https://ssfixturing.com/api/curruser", {
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
      setCurrentUser(userData);
      console.log('Current User:', userData);
      return userData; 
    } catch (error) {
      // console.error('Error fetching current user:', error);
      setisloggedIn(false);
      return null; 
    }
  };

  const handleBeforeInstallPrompt = (e) => {
    e.preventDefault(); 
    setDeferredPrompt(e); 
};
  useEffect(() => {
    currUser();
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  };
  }, []);

  if(isloggedIn===null){
    return(
    <Loader/>
    )
  }

  return (
      <>
            <PwaInstall deferredPrompt={deferredPrompt} setDeferredPrompt={setDeferredPrompt}/>
      <HelmetProvider>
      <Router>
        <ScrollToTop/>
          <Navbar isloggedIn={isloggedIn} setisloggedIn={setisloggedIn} />
        <div>
         
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login currUser={currUser} setisloggedIn={setisloggedIn}/>} />
            <Route path="/signup" element={<SignUp setisloggedIn={setisloggedIn}/>} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
            <Route path="/potential" element={<Potential />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/pricing" element={<Pricing />} />




            <Route path="/assemblyFixture" element={<Assembly />} />
            <Route path="/HydraulicFixture" element={<Hydraulic />} />
            <Route path="/HydralicPowerPack" element={<HydraulicPowerPack />} />
            <Route path="/MechanicalFixture" element={<Mechanical />} />
            <Route path="/WeldingFixture" element={<Welding />} />
            {/* <Route path="/upload" element={<BillMain  currentUser={currentUser}/>} /> */}


            <Route path="/upload" element={
                <ProtectedRoute isloggedIn={isloggedIn}>
                  <BillMain currentUser={currentUser} />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Error/>} />
          </Routes>
        </div>
      </Router>
      </HelmetProvider>
    </>
  )
}

export default App
