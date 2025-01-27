import { useNavigate } from "react-router-dom"
import './showbills.css'
import { useEffect } from "react"
export default function Showbills({bills,name,fetchBill}){
    const navigate=useNavigate()
    const deletebill=async(billId)=>{
        const response=await fetch(`http://localhost:8080/api/bill/${billId}`,{
            method:'DELETE'
        })
        if(response.ok){
            alert("the bill is deleted succefull")
            fetchBill()
            return
        }
        alert("problem in deleting the bill")

    }
    return(
        <>
        <div>
            <h3>Bills related to {name}</h3>
        <div className="showbills-main">
            {bills.map((item)=>(
                <div className="showbill-box" style={{color:"white",margin:'20px',cursor:'pointer'}} >
                      <div className="show-bill-desc" onClick={()=>navigate(`/invoice/${item.billId}/${item.cname}`)}>invoiceNO: {item.invoiceNo}</div>
                      <div className="show-bill-desc" onClick={()=>navigate(`/invoice/${item.billId}/${item.cname}`)}>invoiceDate: {item.invoicedate}</div>
                   <div className="show-bill-desc-btn"> <button onClick={()=>deletebill(item.billId)}>Delete</button> 
                   <button onClick={()=>navigate(`/bill/${item.billId}`)}>update</button></div>
                </div>
            ))}
        </div>
        </div>
        </>
    )
}