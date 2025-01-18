import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './showcustomer.css'
import CreateBill from "../bills/billmain"

export default function ShowCustomer(){
    const {serialNo}=useParams()
    const[createbill,setcreatebill]=useState(true)
     const [customer,setcustomer]=useState({})
    
        const fetchCustomer=async()=>{
            const responce=await fetch(`http://localhost:8080/api/customer/${serialNo}`)
            if(!responce.ok){
                return alert("failed to fetch customers")
            }
            const data= await responce.json()
            // console.log(data)
            setcustomer(data.customer)
            
            
        }
        useEffect(()=>{
            fetchCustomer()
        },[])
        console.log(customer)
    return(
        <>{ createbill ?
        <div className="show-customer-main">
            <h3>Customer Details</h3>
            <div className="show-customer-info">
               <div className="show-customer-box">
                    <div className="box1">
                        <div className="c-name"><b>Name: &nbsp;</b>{customer.name}</div>
                        <div className="c-email"><b>E-mail: &nbsp;</b>{customer.email}</div>
                        <div className="c-gstno"><b>GstNo: &nbsp;</b>{customer.gstNo}</div>
                    </div>
                    <div className="box2">
                        <div className="c-address"><b>addreass: &nbsp;</b>{customer.address}</div>
                        <div className="c-contact"><b>contact: &nbsp;</b>{customer.contact}</div>
                    </div>
                    <div className="box3">
                    </div>
               </div>
               <div className="c-btn">
                <button onClick={()=>setcreatebill(false)}>Create Bill</button>
               </div>
            </div>
          
        </div>:
        <CreateBill customer={customer} setcreatebill={setcreatebill}/>}
        </>
    )
}