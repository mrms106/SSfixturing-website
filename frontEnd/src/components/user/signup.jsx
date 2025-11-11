import Swal from 'sweetalert2';
import '../css/login.css'
import '../css/spinner.css'
import Navbar from '../includes/navbar';
import { useState } from 'react';
import SignupBtn from './signupbtn';
import SignPassword from './signPassword';
import SignInput from './signInput';
import { useNavigate } from 'react-router-dom';
import HomeHead from '../homehead';
import  web from '../../customers/web';
export default function signUp({setisloggedIn}){
    const navigate=useNavigate()
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        repeatpass: '',
        otp: '',
      });
      const [loading, setLoading] = useState(false);
      const [otpLoading, setOtpLoading] = useState(false);
      const [otpSent, setOtpSent] = useState(false);
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };
    
     
    
      const onFormSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password, otp, repeatpass } = form;
    
        if (password !== repeatpass) {
          Swal.fire({
            icon: 'warning',
            title: 'Passwords do not match',
            text: 'Please enter both passwords again.',
          });
          return;
        }
    
        setLoading(true);
    
        try {
          const response = await fetch(`${web}/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, otp }),
            credentials: 'include'
          });
    
          const data = await response.json();
          if (response.ok) {
            Swal.fire({
              title: 'Signup Successful',
              text: data.successMessage || 'You have successfully Registered!',
              icon: 'success',
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonText: 'OK',
            }).then(() => {
              setisloggedIn(true)
              navigate("/")
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Signup Failed',
              text: data.errorMessage,
            });
          }
        } catch (err) {
          console.log('Error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred. Please try again.',
          });
        } finally {
          setLoading(false);
        }
      };
    
     
      return (
        <div>
           <HomeHead
          title="Sign Up - SS Fixturing"
          description="Sign up for SS Fixturing to create your account and start managing your precision fixture requirements."
        />
          <h2 className="con1">Sign-UP:</h2>
          <div className="contactus">
            <form onSubmit={onFormSubmit} className="needs-validation">

              <SignInput form={form} handleInputChange={handleInputChange}/>
              <SignPassword form={form} handleInputChange={handleInputChange}/>
              <SignupBtn loading={loading} navigate={navigate}
              otpLoading={otpLoading} otpSent={otpSent}
              setOtpLoading={setOtpLoading} form={form} 
              setOtpSent={setOtpSent}
              />
             
            </form>
          </div>
        </div>
      );
}