import '../css/hydraulic.css'
import Navbar from '../includes/navbar';
import Footer from '../includes/footer';
import ProductBoxes from '../home/productbox';
import HomeHead from '../homehead';

import assembly1 from '../images/fixturePages/assembly/welding1.jpg'
import assembly2 from '../images/fixturePages/assembly/welding2.jpg'
import assembly3 from '../images/fixturePages/assembly/welding3.jpg'


export default function welding(){
  return(
    <div>
         <HomeHead
          title="Welding Fixtures - SS Fixturing"
          description="Explore SS Fixturing's welding fixtures designed for precision and efficiency in welding processes."
        />
      <h2 className="h2">Welding Fixture</h2>
      <hr style={{ border: '0.5px outset white', borderWidth: '10%', width: '100%', margin: '10px auto' }} />

      <div className="hydralicBody">
        <div className="text-container">
          <p className="p">
            A welding fixture is a dedicated tool designed to hold and support workpieces in a precise and stable manner during welding. It provides a controlled environment for welding operations, ensuring that the components are accurately aligned and securely positioned. Welding fixtures are commonly employed in various welding applications to enhance efficiency and maintain consistent weld quality.
            <ul className="p">
              <li><b>Alignment and Positioning:</b>
                Welding fixtures are designed to accurately align and position the components being welded. This ensures that the welding process occurs at the correct angles and locations, resulting in welds that meet design specifications.
              </li>
              <li><b>Stability and Rigidity:</b> The fixture provides stability and rigidity to the workpieces, minimizing the effects of thermal expansion and contraction during the welding process. This stability is crucial for maintaining the integrity and quality of the welds.
              </li>
              <li><b>Repeatability:</b> Welding fixtures contribute to repeatability in the welding process. Once a fixture is set up for a particular component, it can be used repeatedly to produce identical welds. This is particularly important in mass production and ensures consistent quality across batches.
              </li>
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

      
      <p style={{ color: 'white', fontSize: '22px', alignItems: 'center', justifyContent: 'center', display: 'flex', height: '10vh', marginTop: '50px', marginLeft: '20px' }}>
        SS Fixturing Precision Redefined, Excellence Delivered!
      </p>
    <Footer/>
    </div>
  )
}