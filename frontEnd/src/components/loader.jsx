
import weblogo from './images/logo.gif'
import slogan from './images/slogan.gif'

export default function Loader(){
    return(
        <div>
        <div id="splash-screen">
         <img src={weblogo} alt="Website logo" />
         <div>
           <img src={slogan} alt="img" />
         </div>
       </div>
     </div>
    )
}