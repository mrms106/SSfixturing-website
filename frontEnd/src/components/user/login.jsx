import { useState } from 'react';
import '../css/login.css'
import '../css/spinner.css'
import Navbar from '../includes/navbar';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

export default function login({currUser,setisloggedIn}){
  const navigate = useNavigate();
  const [loginForm,setloginForm]=useState({
    username:"",
    password:""
  })
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async(event) => {
    event.preventDefault();
    try{
        setLoading(true);
     const responce= await fetch("http://localhost:8080/login",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username:loginForm.username,
            password:loginForm.password
        }),
        credentials: 'include'
     })
     let data;
     try {
       const text = await response.text(); // Get raw response text
       data = text ? JSON.parse(text) : {}; // Parse if non-empty, otherwise set to empty object
     } catch (error) {
       data = {}; // Default to an empty object if parsing fails
     }
      if(responce.ok){
        Swal.fire({
            title: 'Login Successful',
            text: data.message || 'You have successfully logged in!',
            icon: 'success',  
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'OK'
        }).then(async()=>{
          const userData = await currUser(); // Fetch current user after login
          setisloggedIn(true);
          if(userData?.username === "demo"){
            return  navigate  ('/upload');
          }
          navigate("/")
        })

     }else{
        // console.log(err)
        Swal.fire({
            title: 'Login Failed',
            text: data.message || 'Invalid username or password. Please try again.',
            icon: 'error',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'OK'
        });
    }}catch(err){
        console.log(err)
        // alert("error in login please try again")
        Swal.fire({
          title: 'Error',
          text: 'An error occurred during login. Please try again later.',
          icon: 'error',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonText: 'OK'
        })
    }finally{
        setLoading(false)
    }
     }

  const inputChange=(e)=>{
    setloginForm({...loginForm,[e.target.name]:e.target.value})
  }
  
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignupRedirect = () => {
    navigate("/signup")
  };
    return(
        <>
        {/* <Navbar/> */}
          <h2 className="con1">Login page</h2>
      <div className="contactus">
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Your username"
              autoComplete="username"
              value={loginForm.username}
              onChange={inputChange}
              required
            />
            <span className="input-icon">
              <i className="fas fa-user"></i>
            </span>
          </div>
          
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Your password"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={inputChange}
              required
            />
            <span className="input-icon" id="showPass" onClick={handleShowPassword}>
              {showPassword ? 'HIDE' : 'SHOW'}
            </span>
          </div>
          <div className="accCreate">
            <button type="submit" className="submit" id="submit">
              {loading ? (
                <span className="subspan2" id="subspan2">
                  Logging in<span className="spinner"></span>
                </span>
              ) : (
                <span className="subspan1" id="subspan1">Log-In</span>
              )}
            </button>
            <button type="button" onClick={handleSignupRedirect}>
              Sign-UP?
            </button>
          </div>
        </form>
      </div>
        </>

    )
}