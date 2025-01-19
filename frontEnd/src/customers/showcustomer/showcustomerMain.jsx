import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './showcustomer.css'
import CreateBill from "../bills/billmain"
import Showbills from "./showbills/showbills"

export default function ShowCustomer(){
    const {serialNo}=useParams()
    const[createbill,setcreatebill]=useState(true)
     const [customer,setcustomer]=useState({})
     const[bills,setbills]=useState([])
     const[showbill,setshowbill]=useState(false)
    
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
              setshowbill(true)
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
                <button onClick={()=>fetchBill()}>show Bill</button>
               </div>
            </div>
         { showbill ?<Showbills bills={bills}/>:null}
        </div>:
        <CreateBill customer={customer} setcreatebill={setcreatebill}/>}
        </>
    )
}