import { useEffect, useState } from "react"
import './customer.css'

export default function CustomerMain(){
    const [customers,setcustomers]=useState([])

    const fetchCustomer=async()=>{
        const responce=await fetch('http://localhost:8080/api/allcustomers')
        if(!responce.ok){
            return alert("failed to fetch customers")
        }
        const data= await responce.json()
        // console.log(data)
        setcustomers(data.customers)
        
    }
    useEffect(()=>{
        fetchCustomer()
    },[])
    return(
        <>
       <div className="customer-main">
        <h1>Our Customers</h1>
        <div className="customer-main2">
           {
            customers.length>0 && customers.map((customer)=>(
                <div className="customer-box">
                <div className="customer-info">
                    <div className="customer-name"><b>Name:&nbsp;</b>{customer.name}</div>
                    <div className="customer-email"><b>Email:&nbsp;</b>{customer.email}</div>
                </div>
                <div className="customer-line"></div>
                <div className="customer-btns">
                    <button>Update Info</button>
                    <button>Delete</button>
                </div>
            </div>
            ))
           }
           
        </div>
       </div>

        </>
    )
}