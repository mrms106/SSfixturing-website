import { useNavigate } from "react-router-dom"
import './showbills.css'
export default function Showbills({bills,name}){
    const navigate=useNavigate()
    return(
        <>
        <div>
            <h3>Bills related to {name}</h3>
        <div className="showbills-main">
            {bills.map((item)=>(
                <div className="showbill-box" style={{color:"white",margin:'20px',cursor:'pointer'}} onClick={()=>navigate(`/invoice/${item.invoiceNo}`)}>
                      <div className="show-bill-desc">invoiceNO: {item.invoiceNo}</div>
                      <div className="show-bill-desc">invoiceDate: {item.invoicedate}</div>
                   <div className="show-bill-desc"> Descr: {item.description}</div>
                </div>
            ))}
        </div>
        </div>
        </>
    )
}