import React from 'react';
import '../css/hydraulic.css'
import Navbar from '../includes/navbar';
import Footer from '../includes/footer';
import ProductBoxes from '../home/productbox';
import HomeHead from '../homehead';

import hydrolic1 from '../images/fixturePages/hydraulic/hydraulic.jpg'
import hydrolic2 from '../images/fixturePages/hydraulic/hydraulic1.jpg'
import hydrolic3 from '../images/fixturePages/hydraulic/hydraulic2.jpg'


function HydraulicFixture() {
  return (
    <div>
       <HomeHead
          title="Hydraulic Fixtures - SS Fixturing"
          description="Discover SS Fixturing's range of hydraulic fixtures for VMC and HMC machining centers, designed for precision and durability."
        />
      <h2 className="h2">Hydraulic Fixture</h2>
      <hr
        style={{
          border: '0.5px outset white',
          borderWidth: '10%',
          width: '100%',
          margin: '10px auto',
        }}
      />
      

      {/* Main Content */}
      <div className="hydralicBody">
        <div className="text-container">
          <p className="p">
            A hydraulic fixture is a specialized tool used in the field of
            manufacturing and machining to secure and stabilize workpieces
            during various machining operations. This fixture employs hydraulic
            principles to efficiently and securely clamp workpieces in place,
            ensuring precision and accuracy in the machining process.
          </p>
          <ul className="p">
            <li>
              <b>Functionality:</b> Hydraulic fixtures are specialized devices
              used in manufacturing and machining processes.
            </li>
            <li>
              <b>Workpiece Stability:</b> Hydraulic fixtures provide a stable
              and rigid platform for workpieces, ensuring accuracy and precision
              during machining.
            </li>
            <li>
              <b>High Pressure Capability:</b> Hydraulic systems can provide
              high clamping forces, making them suitable for heavy-duty
              machining applications
            </li>
            <li>
              <strong>Quality Improvement:</strong> The stability provided by
              hydraulic fixtures contributes to improved surface finish,
              dimensional accuracy, and overall quality of machined parts.
            </li>
            <li>
              <strong>Cost-Effective Solutions:</strong> While hydraulic
              fixtures may require an initial investment, they can lead to cost
              savings in the long run by increasing productivity, reducing
              scrap, and minimizing downtime.
            </li>
          </ul>
        </div>

        <div className='fixtureimages'>
            <span className="i1">
            <img src={hydrolic1} alt="img" loading="lazy" />
            </span>
            <span className="i2">
            <img src={hydrolic2} alt="img" loading="lazy" />
            </span>
            <span className="i3">
            <img src={hydrolic3} alt="img" loading="lazy" />
            </span>
        </div>

        <ProductBoxes />
       

        {/* Footer Text */}
        <p
          style={{
            color: 'white',
            fontSize: '20px',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            height: '10vh',
            marginTop: '50px',
            marginLeft: '20px',
          }}
        >
          SS Fixturing Precision Redefined, Excellence Delivered!
        </p>
      </div>

     <Footer/>
    </div>
  );
}

export default HydraulicFixture;
