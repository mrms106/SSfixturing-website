import React, { useState,useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/navbar.css';
import logo from '../images/sslogo.png'
const Navbar = ({isloggedIn,setisloggedIn}) => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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
    try {
      const response = await fetch("http://localhost:8080/logout", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setisloggedIn(false)
      console.log('Logout successful:', data.message || 'User has been logged out.');

      window.location.href = '/login'; 

      return data;
    } catch (error) {
      console.error('Error during logout:', error);
      return null;
    }
  };
 

  return (
    <div className="fix">
          <div className="social-icons">
    <a href="https://wa.me/+919604233567"><i className="fab fa-whatsapp"></i><span>WhatsApp</span></a>
    <a href="https://www.facebook.com/ssfixturing"><i className="fab fa-facebook"></i><span>Facebook</span></a>
    <a href="https://www.instagram.com/ssfixturing"><i className="fab fa-instagram"></i><span>Instagram</span></a>
    <a href="https://www.linkedin.com/ssfixturing"><i className="fab fa-linkedin"></i><span>LinkedIn</span></a>
  </div>
      <div className="contact-info">
        <div className="contact-item">
          <i className="fas fa-phone"></i>
          <a href="tel:+919604233567">+91 96042 33567</a>
        </div>
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <a href="mailto:ssfixturing1@gmail.com">ssfixturing1@gmail.com</a>
        </div>
      </div>

      <header>
        <div className="logo">
          <a href="/"><img src={logo} alt="Your Logo" /></a>
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
            <li><a href="/">HOME</a></li>
            <li><a href="/about">ABOUT</a></li>
            <li><a href="/potential">POTENTIAL</a></li>
            <li><a href="/capabilities">CAPABILITIES <br /> & SOLUTION</a></li>
            <li><a href="/pricing">PRICING &<br /> PACKAGES</a></li>
            <li><a href="/contactUs">CONTACT US</a></li>
            {/* <li><a href="/login">login</a></li> */}

            {isloggedIn ? <li onClick={logout}><a >Log-Out</a></li>:  <li><a href="/signup">Register</a></li>}

          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
