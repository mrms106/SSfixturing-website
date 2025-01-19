import { useNavigate } from "react-router-dom"

export default function Showbills({bills}){
    const navigate=useNavigate()
    return(
        <>
        <div className="showbills-main">
            {bills.map((item)=>(
                <div style={{color:"white",margin:'20px',cursor:'pointer'}} onClick={()=>navigate(`/invoice/${item.invoiceNo}`)}>
                    {item.invoiceNo}
                </div>
            ))}
        </div>
        </>
    )
}