import React from 'react';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="mainfooter">
        <h2 className="footerH1">Contact Us:</h2>
        <div className="footerContactus">
          <div className="contactBox">
            <div className="icon-container">
              <a href="tel:+919284550570">
                <div className="icon">&#9742;</div>
              </a>
            </div>
            <div>
              <p className="pt">+919284550570</p>
            </div>
          </div>
          
            <div className="contactBox">
              <div className="icon-container">
                <a href="tel:+919604233567">
                  <div className="icon">&#9742;</div>
                </a>
              </div>
              <div>
                <p className="pt">+919604233567</p>
              </div>
            </div>
          
          <div className="contactBox">
            <div className="icon-container">
              <div className="icon">&#9873;</div>
            </div>
            <div>
              <p className="pt">
                <span>Fixturing, W-106 S Block, M.I.D.C, Bhosari, Pune-411026</span>
              </p>
            </div>
          </div>
          
            <div className="contactBox">
              <div className="icon-container">
                <a href="mailto:ssfixturing1@gmail.com">
                  <div className="icon">&#9993;</div>
                </a>
              </div>
              <div>
                <p className="pt">ssfixturing1@gmail.com</p>
              </div>
            </div>
        </div>
        <div>
          <div className="button-container">
            <a href="tel:+919604233567" className="call-now-button">Call Now</a>
            <a href="https://wa.me/+919604233567" className="whatsapp-button" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
          </div>
          <div className="copyright">
            <p>Hydraulic Fixture Pune</p>
          </div>
          <div className="copyright">
            <p>
              &copy; 2023 <i>SS Fixturing</i>. All rights reserved. <br /> 
              Developed by <a href="https://www.makardhwaj.rf.gd/?i=1" target="_blank" rel="noopener noreferrer"><i>Makardhwaj</i></a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
