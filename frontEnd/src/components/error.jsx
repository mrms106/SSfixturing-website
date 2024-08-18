
import { useNavigate } from 'react-router-dom';
import './css/about.css'

export default function error(){
    const navigate=useNavigate()
    return(
        <>
           <div className="navItem-Body">
              <div>
               <h1>Something Went Wrong...</h1> 
                 <p style={{color:"white"}}>This Page Is Not Available </p>
                <button style={{width:"150px", height:"50px", border:"1px solid white", 
                backgroundColor:"#19171A", color:"white", fontSize:"18px",
                 borderRadius:"14px", cursor:"pointer"}}
                 onClick={()=>navigate("/")}> Go to the Home </button>
              </div>
           </div>
        </>
    )
}