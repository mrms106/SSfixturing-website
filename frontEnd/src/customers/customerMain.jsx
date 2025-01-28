import { useEffect, useState } from "react"
import './customer.css'
import { useNavigate } from "react-router-dom"

export default function CustomerMain(){
    const navigate=useNavigate()
    const [customers,setcustomers]=useState([])

    const fetchCustomer=async()=>{
        const responce=await fetch('http://localhost:8080/api/allcustomers')
        if(!responce.ok){
            return alert("failed to fetch customers")
        }
        const data= await responce.json()
        console.log(data)
        setcustomers(data.customers)
        
    }
    useEffect(()=>{
        fetchCustomer()
    },[])

    const deleteButton=async(serialNo)=>{
        const responce= await fetch(`http://localhost:8080/api/deletecustomer/${serialNo}`,{
            method:'DELETE',
            credentials:'include'
        })
        if(responce.ok){
            alert("the customer is deleted from database")
            fetchCustomer()
            return;
        }
        alert('problem in deleting the customer')
    }
    return(
        <>
       <div className="customer-main">
        <h1>Our Customers</h1>
        <div className="customer-main2">
           {
            customers.length>0 && customers.map((customer,idx)=>(
                <div className="customer-box" key={idx}>
                <div className="customer-info" onClick={()=>navigate(`/customer/${customer.serialNO}`)}>
                    <div className="customer-name"><b>Name:&nbsp;</b>{customer.name}</div>
                    <div className="customer-email"><b>Email:&nbsp;</b>{customer.email}</div>
                    <div className="customer-colors">
                        {customer.totalAmount>customer.creditAmount?<div className="customer-red"></div>:
                         <div className="customer-green"></div>}
                    </div>
                </div>
                <div className="customer-line"></div>
                <div className="customer-btns">
                    <button onClick={()=>navigate(`/update/${customer.serialNO}`)}>Update Info</button>
                    <button onClick={()=>deleteButton(customer.serialNO)}>Delete</button>
                </div>
            </div>
            ))
           }
           <div className="customer-box customer-box2" onClick={()=>navigate('/addcustomer')}>
                <div className="customer-text">
                  Add new customer <i className="fa-solid fa-square-plus"></i>
                </div> 
            </div>
           
        </div>
       </div>

        </>
    )
}