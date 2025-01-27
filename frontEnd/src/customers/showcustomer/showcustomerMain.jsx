import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './showcustomer.css'
import CreateBill from "../bills/billmain"
import Showbills from "./showbills/showbills"
import Showledger from "./showledger/showledgermain"

export default function ShowCustomer(){
    const {serialNo}=useParams()
    const[createbill,setcreatebill]=useState(true)
     const [customer,setcustomer]=useState({})
     const[bills,setbills]=useState([])
    
        const fetchCustomer=async()=>{
            const responce=await fetch(`http://localhost:8080/api/customer/${serialNo}`)
            if(!responce.ok){
                return alert("failed to fetch customers")
            }
            const data= await responce.json()
            // console.log(data)
            setcustomer(data.customer)
            
            
        }
        const fetchBill=async()=>{
            
            const responce=await fetch('http://localhost:8080/api/bills',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({serialNo:customer.serialNO})
            })
            if(!responce.ok){
                alert('problem in fetching bills')
                return;
                  }
            const data=await responce.json()
              setbills(data.data)
              console.log(data)
             
        }

        useEffect(()=>{
            fetchCustomer()
        },[])
       
        useEffect(()=>{
            if(customer.serialNO){
                fetchBill()
            }
        },[customer.serialNO])
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
                        <div className="c-totalamount">Total-Amount : {customer.totalAmount}</div>
                        <div className="c-creditedAmount">Creadited-Amount: {customer.creditAmount}</div>
                        <div className="pending-Amount">Pending-Amount : {customer.pendingAmount}</div>
                    </div>
               </div>
               <div className="c-btn">
                <button onClick={()=>setcreatebill(false)}>Create Bill</button>
               </div>
            </div><hr></hr>
            <Showledger bills={bills} fetchBill={fetchBill} customer={customer} fetchCustomer={fetchCustomer}/>
            
            <hr></hr>
        <Showbills bills={bills} name={customer.name} fetchBill={fetchBill}/>
        </div>:
        <CreateBill customer={customer} setcreatebill={setcreatebill}/>}
        </>
    )
}