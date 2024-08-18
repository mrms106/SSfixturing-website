import '../css/hydraulic.css'
import Navbar from '../includes/navbar';
import Footer from '../includes/footer';
import ProductBoxes from '../home/productbox';

import assembly1 from '../images/fixturePages/assembly/welding1.jpg'
import assembly2 from '../images/fixturePages/assembly/welding2.jpg'
import assembly3 from '../images/fixturePages/assembly/welding3.jpg'

export default function assembly(){
    return(
        <div>
            {/* <Navbar/> */}
        <h2 className="h2">Assembly Fixture</h2>
  
        <hr style={{ border: '0.5px outset white', borderWidth: '10%', width: '100%', margin: '10px auto' }} />
  
        <div className="hydralicBody">
          <div className="text-container">
            <p className="p">
              An assembly fixture is a dedicated device designed to assist in the accurate and efficient assembly of components or sub-assemblies. It provides a controlled environment that ensures proper alignment and positioning of parts, facilitating the assembly process and contributing to the overall quality and consistency of the final product.
              <ul className="p">
                <li><b>Alignment and Precision:</b> Assembly fixtures are engineered to align components with precision. This ensures that parts fit together accurately and that the final assembly meets design specifications.</li>
                <li><b>Fixture Configurations:</b> Assembly fixtures come in various configurations, such as jigs, templates, or specialized tooling, tailored to the specific assembly requirements. These fixtures may include guiding elements, clamps, or other features to secure and position components correctly.</li>
                <li><b>Speed and Efficiency:</b> The use of assembly fixtures speeds up the assembly process by providing a structured framework for aligning and joining components. Workers can follow a systematic procedure, reducing the time required for assembly while maintaining quality.</li>
                <li><b>Consistency and Repeatability:</b> Assembly fixtures contribute to consistency and repeatability in the assembly process. Once a fixture is set up for a particular product or component, it can be used repeatedly, ensuring that each unit is assembled with the same precision and accuracy.</li>
              </ul>
            </p>
          </div>
  
          <div className='fixtureimages'>
            <span className="i1">
            <img src={assembly1} alt="img" loading="lazy" />
            </span>
            <span className="i2">
            <img src={assembly2} alt="img" loading="lazy" />
            </span>
            <span className="i3">
            <img src={assembly3} alt="img" loading="lazy" />
            </span>
        </div>
        </div>
  
       <ProductBoxes/>
  
        <p style={{ color: 'white', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '10vh', marginTop: '50px', marginLeft: '20px' }}>
          SS Fixturing Precision Redefined, Excellence Delivered!
        </p>
        <Footer/>
      </div>
    )
}