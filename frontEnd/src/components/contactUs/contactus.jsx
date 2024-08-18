import { useState,useRef } from "react";
import '../css/login.css'
import Navbar from "../includes/navbar";
import Swal from 'sweetalert2';

export default function contactUs(){
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);
    const recaptchaRef = useRef(null);
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    //   const recaptchaResponse = recaptchaRef.current.getValue();
  
    //   if (!recaptchaResponse) {
    //     Swal.fire({
    //       icon: 'warning',
    //       title: 'Complete recaptcha',
    //       text: 'Please complete the recaptcha ...',
    //     });
    //     return;
    //   }
  
      setLoading(true);
  
      try {
        const response = await fetch('http://localhost:8080/contactUS', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...form,
            // 'g-recaptcha-response': recaptchaResponse,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Thank You..!',
            text: result.message,
          });
          setForm({ name: '', email: '', phone: '', message: '' });
        //   recaptchaRef.current.reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong..',
            text: result.error || 'Please submit the form again.',
          });
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error in Submission',
          text: 'Try Again or try after some time.',
        });
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        {/* <Navbar/> */}
        <h2 className="con1">Contact US:</h2>
        <div className="contactus">
          <form id="contact" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <i className="fas fa-user"></i>
              </span>
            </div>
  
            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your E-mail"
                value={form.email}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
  
            <div className="input-group">
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Your Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <span className="input-icon">
                <i className="fas fa-phone"></i>
              </span>
            </div>
  
            <div className="input-group">
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
              <span className="input-icon">
                <i className="fas fa-comment"></i>
              </span>
            </div>
  
            <div className="g-recaptcha" ref={recaptchaRef} data-sitekey="6LcQMgQqAAAAAIo6tQKdSm7kHNNXjkfwbiYr6by5"></div>
  
            <button className="submit" id="submit" type="submit" disabled={loading}>
              <span className="subspan2" id="subspan2" style={{ display: loading ? 'block' : 'none' }}>
                Submitting..<span className="spinner"></span>
              </span>
              <span className="subspan1" id="subspan1" style={{ display: loading ? 'none' : 'block' }}>
                Submit
              </span>
            </button>
          </form>
        </div>
      </div>
    );
}