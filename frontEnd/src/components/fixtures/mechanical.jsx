import '../css/hydraulic.css'
import Navbar from '../includes/navbar';
import Footer from '../includes/footer';
import ProductBoxes from '../home/productbox';

// import hydrolicpp1 from '../images/fixturePages/mechanical/mechanical1.jpg'
// import hydrolicpp2 from '../images/fixturePages/hydralicpp/mechanical1. jpg'
import hydrolicpp3 from '../images/fixturePages/hydralicpp/hydraulicpp3.jpg'


export default function mechanical(){
    return(
        <div>
            {/* <Navbar/> */}
      <h2 className="h2">Mechanical Fixture</h2>

      <hr style={{ border: '0.5px outset white', borderWidth: '10%', width: '100%', margin: '10px auto' }} />

      <div className="hydralicBody">
        <div className="text-container">
          <p className="p">
            A mechanical fixture is a robust and purpose-built device designed to securely clamp and position workpieces for machining, assembly, inspection, or other mechanical processes. It is an essential tool in the field of manufacturing, contributing to the efficiency and quality of production processes.
            <ul className="p">
              <li><b>Stability and Precision:</b> Mechanical fixtures provide a stable and rigid platform for workpieces, minimizing vibrations and ensuring precision during machining operations.</li>
              <li><b>Customization:</b> Fixtures can be customized to accommodate different workpiece shapes and sizes, making them versatile for various manufacturing applications.</li>
              <li><b>Reduced Setup Time:</b> Mechanical fixtures contribute to reducing setup time by providing a standardized and efficient means of securing workpieces.</li>
              <li><b>Enhanced Safety:</b> Properly designed fixtures enhance workplace safety by securely holding workpieces, reducing the risk of accidents during machining processes.</li>
            </ul>
          </p>
        </div>

        <div className='fixtureimages'>
            <span className="i1">
            <img src={hydrolicpp3} alt="img" loading="lazy" />
            </span>
            <span className="i2">
            <img src={hydrolicpp3} alt="img" loading="lazy" />
            </span>
            <span className="i3">
            <img src={hydrolicpp3} alt="img" loading="lazy" />
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