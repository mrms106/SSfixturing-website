import { useState } from 'react';
import '../css/login.css'
import '../css/spinner.css'
import Navbar from '../includes/navbar';
import { useNavigate } from 'react-router-dom';
import HomeHead from '../homehead';
import LoginForm from './loginForm';
import Swal from 'sweetalert2';

export default function login({currUser,setisloggedIn}){
  const navigate = useNavigate();
  const [loginForm,setloginForm]=useState({
    username:"",
    password:""
  })
 
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async(event) => {
    event.preventDefault();
    try{
        setLoading(true);
     const responce= await fetch("https://ssfixturing.com/api/login",{
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
          if(userData?.username === "ShubhamShinde"){
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
  
  
    return(
        <>
         <HomeHead
          title="Login - SS Fixturing"
          description="Login to SS Fixturing to access your account and manage your precision fixture needs."
        />
          <h2 className="con1">Login page</h2>
          <LoginForm handleLoginSubmit={handleLoginSubmit} inputChange={inputChange} 
          loginForm={loginForm} loading={loading} 
          navigate={navigate}/>
      
        </>

    )
}