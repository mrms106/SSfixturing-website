import { useEffect, useState } from 'react'
import './addcustomer.css'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateCustomer(){
    const navigate=useNavigate()
    const [form, setform]=useState({ })
    const{serialNo}=useParams()

    const fetchCustomer=async()=>{
        const responce=await fetch(`http://localhost:8080/api/customer/${serialNo}`)
        if(!responce.ok){
            return alert("failed to fetch customers")
        }
        const data= await responce.json()
        // console.log(data)
        setform(data.customer)
           
    }
    useEffect(()=>{
        fetchCustomer()
    },[])
    const handleInputchange=(e)=>{
        setform({...form,[e.target.name] : e.target.value})
    }
    const onFormSubmit=async(e)=>{
        e.preventDefault()
        const responce=await fetch(`http://localhost:8080/api/customer/${serialNo}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify(form)

        })
        if(responce.ok){
            alert("the customer is updated")
            navigate("/customers")
            return;
        }
        alert("problem in update the customer")

    }
    return(
       <>
       <div className="addcustomer-main">
        <h3>Add customer </h3>
        <form onChange={handleInputchange} onSubmit={onFormSubmit}>
           <div>
           <label>Customer Name</label>
            <input type="name" name="name" placeholder="enter customer name" value={form.name}></input>
            <label>Customer Address</label>
            <input type="address" name="address" placeholder="enter customer address" value={form.address}></input>
            <label>Gst NO.</label>
            <input type="text" name="gstNo" placeholder="enter customer GstNo" value={form.gstNo}></input>
           </div>
          <div>
            <label>email</label>
            <input type="email" name="email" placeholder="enter customer email" value={form.email}></input>
            <label>contact</label>
            <input type="text" name="contact" placeholder="enter customer contact" value={form.contact}></input>
            <button>update Customer</button>
          </div>
          
        </form>
       </div>
       </>
    )
}