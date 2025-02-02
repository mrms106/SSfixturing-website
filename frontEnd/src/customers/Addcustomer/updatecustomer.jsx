import { useEffect, useState } from 'react'
import './addcustomer.css'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import web from '../web';

export default function UpdateCustomer(){
    const navigate=useNavigate()
    const [form, setform]=useState({ })
    const{serialNo}=useParams()

    const fetchCustomer=async()=>{
        const responce=await fetch(`${web}/customer/${serialNo}`,{
            credentials:'include'
        })
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
        const responce=await fetch(`${web}/customer/${serialNo}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify(form)

        })
        if(responce.ok){
            Swal.fire({
                title: 'updated',
                text:  'You have successfully update the customer!',
                icon: 'success',  
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'OK'
            })
            navigate("/customers")
            return;
        }
        Swal.fire({
            title: 'Failed',
            text: 'failed to update the customer. Please try again.',
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
            <input type="name" name="name" placeholder="enter customer name" value={form.name}></input>
            <label>Customer Address Bill To</label>
            <input type="address" name="addressBillto" placeholder="enter customer address Bill To" value={form.addressBillto}></input>
            <label>Customer Address supply To</label>
            <input type="address" name="addressSypplyto" placeholder="enter customer address supply To" value={form.addressSypplyto}></input>
            <label>State & State Code</label>
            <input type="text" name="Statecode" placeholder="enter customer state & state code" value={form.Statecode}></input>
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