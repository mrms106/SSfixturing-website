import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './showcustomer.css'
import CreateBill from "../bills/billmain"
import Showbills from "./showbills/showbills"
import Showledger from "./showledger/showledgermain"
import web from "../web"

export default function ShowCustomer(){
    const {serialNo}=useParams()
    const[createbill,setcreatebill]=useState(true)
     const [customer,setcustomer]=useState({})
     const[bills,setbills]=useState([])
    
        const fetchCustomer=async()=>{
            const responce=await fetch(`${web}/customer/${serialNo}`,{
                credentials:'include'
            })
            if(!responce.ok){
                return alert("failed to fetch customers")
            }
            const data= await responce.json()
            // console.log(data)
            setcustomer(data.customer)
            
            
        }
        const fetchBill=async()=>{
            
            const responce=await fetch(`${web}/bills`,{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                credentials:'include',
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
    return (
    <>
        {createbill ?
        <div className="show-customer-main">
            <h3>Customer Details</h3>

            <div className="show-customer-info">
                <div className="show-customer-box">

                    {/* Box 1 — Identity */}
                    <div className="box1">
                        <div className="c-name">
                            <b>Name</b>{customer.name}
                        </div>
                        <div className="c-email">
                            <b>Email</b>{customer.email}
                        </div>
                        <div className="c-gstno">
                            <b>GST No.</b>{customer.gstNo || '—'}
                        </div>
                    </div>

                    {/* Box 2 — Address */}
                    <div className="box2">
                        <div className="c-address">
                            <b>Bill To</b>{customer.addressBillto || '—'}
                        </div>
                        <div className="c-address">
                            <b>Supply To</b>{customer.addressSypplyto || '—'}
                        </div>
                        <div className="c-contact">
                            <b>Contact</b>{customer.contact || '—'}
                        </div>
                    </div>

                    {/* Box 3 — Amounts */}
                    <div className="box3">
                        <div className="c-totalamount">
                            <span>Total Amount</span>
                            <span>₹ {customer.totalAmount ?? 0}</span>
                        </div>
                        <div className="c-creditedAmount">
                            <span>Credited Amount</span>
                            <span>₹ {customer.creditAmount ?? 0}</span>
                        </div>
                        <div className="pending-Amount">
                            <span>Pending Amount</span>
                            <span>₹ {customer.pendingAmount ?? 0}</span>
                        </div>
                    </div>

                </div>

                <div className="c-btn">
                    <button onClick={() => setcreatebill(false)}>
                        + Create Bill
                    </button>
                </div>
            </div>

            <hr />
            <Showledger bills={bills} fetchBill={fetchBill} customer={customer} fetchCustomer={fetchCustomer} />
            <hr />
            <Showbills bills={bills} name={customer.name} fetchBill={fetchBill} />

        </div>
        :
        <CreateBill customer={customer} setcreatebill={setcreatebill} fetchBill={fetchBill} />}
    </>
)
}