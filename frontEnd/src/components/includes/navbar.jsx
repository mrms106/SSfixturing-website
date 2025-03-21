import React, { useState,useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/navbar.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialIcons from './socialIcons';

const Navbar = ({isloggedIn,setisloggedIn}) => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate=useNavigate()
  const logo='https://ssfixturing.com/sslogo.png'

  const changeNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.nav');
      const mobileMenuToggle = document.querySelector('.menu-toggle input');
      
      if (nav && nav.classList.contains('show') ) {
        setIsClicked(true);
        mobileMenuToggle.click(); 
        nav.classList.remove('show');
        
        setTimeout(() => {
          setIsClicked(false);
        }, 100); 
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); 
    };
  }, [isClicked]);

  const logout = async () => {
    Swal.fire({
      title: 'logging Out...',
      text: 'Please wait for few seconds...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
          Swal.showLoading();
      }
  });
  
    try {
      const response = await fetch("https://ssfixturing.com/api/logout", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });
  
      if (!response.ok) {
        Swal.close()
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setisloggedIn(false)
      Swal.close()
      Swal.fire({
        title: 'Log-Out Successful',
        text: data.message || 'You have successfully log-out!',
        icon: 'success',  
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'OK'
    })
      console.log('Logout successful:', data.message || 'User has been logged out.');

       navigate("/login")

      return data;
    } catch (error) {
      Swal.close()
      console.error('Error during logout:', error);
      return null;
    }
  };
  const handleNavigation = (path) => {
    const mobileMenuToggle = document.querySelector('.menu-toggle input');
    const nav = document.querySelector('.nav');
    if (nav && nav.classList.contains('show') ) {
    mobileMenuToggle.click(); 
    }
    navigate(path);
    setIsNavVisible(false); 
    setIsClicked(true);
  };

  return (
    <div className="fix">
         <SocialIcons/>

      <header>
        <div className="logo" onClick={()=>handleNavigation("/home")}>
          <img src={logo} alt="Your Logo" loading='lazy' 
          width="990" height="150"
          />
        </div>

        <div className="menu-toggle" id="mobile-menu">
          <input type="checkbox" id="checkbox" onClick={changeNav}/>
          <label htmlFor="checkbox" className="toggle">
            <div className="bar bar--top"></div>
            <div className="bar bar--middle"></div>
            <div className="bar bar--bottom"></div>
          </label>
        </div>
      
        <nav className={`nav ${isNavVisible ? 'show' : ''}`}>
        <ul>
            <li onClick={() => handleNavigation("/home")} className='nava'>HOME</li>
            <li onClick={() => handleNavigation("/about")} className='nava'>ABOUT</li>
            <li onClick={() => handleNavigation("/potential")} className='nava'>POTENTIAL</li>
            <li onClick={() => handleNavigation("/capabilities")} className='nava'>CAPABILITIES <br /> & SOLUTION</li>
            <li onClick={() => handleNavigation("/pricing")} className='nava'>PRICING &<br /> PACKAGES</li>
            <li onClick={() => handleNavigation("/contactUs")} className='nava'>CONTACT US</li>

            {isloggedIn ? (
              <li onClick={logout} className='nava'><a>Log-Out</a></li>
            ) : (
              <li onClick={() => handleNavigation("/signup")} className='nava'>Register</li>
            )}
        </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
