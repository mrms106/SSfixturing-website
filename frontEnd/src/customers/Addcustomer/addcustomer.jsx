import { useState } from 'react'
import './addcustomer.css'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import web from '../web'

export default function AddCustomer(){
    const navigate=useNavigate()
    const [form, setform]=useState({
        name:"",
        addressBillto:'',
        addressSypplyto:"",
        Statecode:'',
        email:"",
        contact:""

    })
    const handleInputchange=(e)=>{
        setform({...form,[e.target.name] : e.target.value})
    }
    const onFormSubmit=async(e)=>{
        e.preventDefault()
        const responce=await fetch(`${web}/addcustomer`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify(form)

        })
        if(responce.ok){
            Swal.fire({
                       title: 'customer is added ',
                       text: 'You have successfully added the customer!',
                       icon: 'success',  
                       allowOutsideClick: false,
                       allowEscapeKey: false,
                       confirmButtonText: 'OK'
                   })
            navigate("/customers")
            return;
        }
        Swal.fire({
                   title: ' Failed',
                   text:  'Failed to add customer, Please try again.',
                   icon: 'error',
                   allowOutsideClick: false,
                   allowEscapeKey: false,
                   confirmButtonText: 'OK'
               });

    }
    return(
       <>
       <div className="addcustomer-main">
        <h3>Add customer </h3>
        <form onChange={handleInputchange} onSubmit={onFormSubmit}>
           <div>
           <label>Customer Name</label>
            <input type="name" name="name" placeholder="enter customer name"></input>
            <label>Customer Address Bill To</label>
            <input type="address" name="addressBillto" placeholder="enter customer address Bill To"></input>
            <label>Customer Address supply To</label>
            <input type="address" name="addressSypplyto" placeholder="enter customer address supply To"></input>
            <label>State & State Code</label>
            <input type="text" name="Statecode" placeholder="enter customer state & state code"></input>
            <label>Gst NO.</label>
            <input type="text" name="gstNo" placeholder="enter customer GstNo"></input>
           </div>
          <div>
            <label>email</label>
            <input type="email" name="email" placeholder="enter customer email"></input>
            <label>contact</label>
            <input type="text" name="contact" placeholder="enter customer contact"></input>
            <button>Add Customer</button>
          </div>
          
        </form>
       </div>
       </>
    )
}