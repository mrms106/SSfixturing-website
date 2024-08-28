
import weblogo from './images/logo.gif'
import slogan from './images/slogan.gif'
import './css/splash.css'
export default function Loader(){
    return(
        <div>
        <div id="splash-screen">
         <img src={weblogo} alt="Website logo" loading='lazy' />
         <div>
           <img src={slogan} alt="img"  loading='lazy'/>
         </div>
       </div>
     </div>
    )
}