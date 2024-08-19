
import { useNavigate } from 'react-router-dom';
import './css/about.css'
import { useState } from 'react';
import HomeHead from './homehead';

export default function error(){
    const navigate=useNavigate()
    const [isHovered, setIsHovered] = useState(false);
    const baseStyle = {
      width: "150px",
      height: "50px",
      border: "1px solid white",
      backgroundColor: "#19171A",
      color: "white",
      fontSize: "18px",
      borderRadius: "14px",
      cursor: "pointer",
      transition: "background-color 0.3s, color 0.3s" // Smooth transition for hover effect
    };
    
    const hoverStyle = {
      backgroundColor: "white",
      color: "black"
    };
    return(
        <>
        <HomeHead
          title="404 - Page Not Found"
          description="The page you are looking for does not exist. Please check the URL or return to the homepage."
        />
           <div className="navItem-Body" style={{marginTop:"200px"}}>
              <div>
               <h1>Something Went Wrong...</h1> 
                 <p style={{color:"white"}}>This Page Is Not Available </p>
                 <button
                     style={{ ...baseStyle, ...(isHovered ? hoverStyle : {}) }}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     onClick={() => navigate("/")}
                   >
      Go to the Home
    </button>
              </div>
           </div>
        </>
    )
}