import '../css/socialIcons.css'
import { Navigate } from 'react-router-dom';

export default function SocialIcons(){
    return(
        <>
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
        </>
    )
}