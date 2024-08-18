import React from 'react';
import '../css/hydraulic.css'
import Navbar from '../includes/navbar';
import Footer from '../includes/footer';
import ProductBoxes from '../home/productbox';

import hydrolicpp1 from '../images/fixturePages/hydralicpp/hydraulicpp1.jpg'
import hydrolicpp2 from '../images/fixturePages/hydralicpp/hydraulicpp2.jpg'
import hydrolicpp3 from '../images/fixturePages/hydralicpp/hydraulicpp3.jpg'

export default function hydralicPowerPack (){
    return(
        <div>
            {/* <Navbar/> */}
      <h2 className='h2'>Hydraulic power pack</h2>
      <hr style={{ border: '0.5px outset white', borderWidth: '10%', width: '100%', margin: '10px auto' }} />

      <div className="hydralicBody">
        <div className="text-container">
          <p className="p">
            A hydraulic power pack serves as a compact and integrated source of hydraulic power, designed to supply pressurized fluid to hydraulic systems. It is commonly used in industrial applications where hydraulic energy is required to operate machinery such as hydraulic presses, lifts, conveyors, and other hydraulic-driven equipment.
            <ul className="p">
              <li><b>Compact and Portable Design:</b> Hydraulic power packs are engineered with a compact and portable design, making them easy to transport and install. This portability allows for flexibility in positioning the power pack in various locations within a facility.</li>
              <li><b>Integrated Components:</b> The power pack typically integrates essential hydraulic components, including a hydraulic pump, motor, reservoir, filters, and control valves. This integration simplifies the installation process and ensures compatibility between components.</li>
              <li><b>Versatility and Customization:</b> Hydraulic power packs are versatile and can be customized to meet specific application requirements. Different pump types, motor sizes, reservoir capacities, and control options can be selected based on the intended use and the hydraulic system's demands.</li>
              <li><b>Efficient Power Transmission:</b> The hydraulic power pack efficiently converts mechanical power into hydraulic power, providing a reliable and consistent source of fluid under pressure. This pressurized fluid is then transmitted through hydraulic hoses to actuators or hydraulic motors, enabling the controlled movement of machinery.</li>
            </ul>
          </p>
        </div>

        <div className='fixtureimages'>
            <span className="i1">
            <img src={hydrolicpp1} alt="img" loading="lazy" />
            </span>
            <span className="i2">
            <img src={hydrolicpp2} alt="img" loading="lazy" />
            </span>
            <span className="i3">
            <img src={hydrolicpp3} alt="img" loading="lazy" />
            </span>
        </div>
      </div>
      <ProductBoxes/>


      <p style={{ color: 'white', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px', marginLeft: '20px' }}>
        SS Fixturing Precision Redefined, Excellence Delivered!
      </p>
      <Footer/>
    </div>
    )
}