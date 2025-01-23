
import weblogo from './images/logo.gif'
import './css/splash.css'
export default function Loader(){
  const slogan='https://res.cloudinary.com/dpgod55rr/image/upload/v1737610299/ssfixturing/signAndlogo/slogan_jppv5z.gif'
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