import { useState } from 'react'
import './addcustomer.css'
import { useNavigate } from 'react-router-dom'

export default function AddCustomer(){
    const navigate=useNavigate()
    const [form, setform]=useState({
        name:"",
        address:"",
        email:"",
        contact:""

    })
    const handleInputchange=(e)=>{
        setform({...form,[e.target.name] : e.target.value})
    }
    const onFormSubmit=async(e)=>{
        e.preventDefault()
        const responce=await fetch('http://localhost:8080/api/addcustomer',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify(form)

        })
        if(responce.ok){
            alert("the customer is created")
            navigate("/customers")
            return;
        }
        alert("problem in adding the customer")

    }
    return(
       <>
       <div className="addcustomer-main">
        <h3>Add customer </h3>
        <form onChange={handleInputchange} onSubmit={onFormSubmit}>
           <div>
           <label>Customer Name</label>
            <input type="name" name="name" placeholder="enter customer name"></input>
            <label>Customer Address</label>
            <input type="address" name="address" placeholder="enter customer address"></input>
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