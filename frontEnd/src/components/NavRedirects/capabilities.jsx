import '../css/about.css'
import Footer from '../includes/footer'
import HomeHead from '../homehead'

export default function capabilities(){
    return(
        <>
        <HomeHead
          title="Capabilities - SS Fixturing"
          description="Discover SS Fixturing's capabilities in providing precision VMC and HMC fixtures to enhance your machining processes."
        />
           <div className="navItem-Body">
            <div className="text-container">
                <h2 className="hp" style={{ marginTop: '50px' }}>Capability & Solution</h2>
                <br />
                <hr style={{ border: '0.5px outset white', borderWidth: '10%', width: '100%', margin: '10px auto' }} />
                
                <h2 className="hp">Our work is the presentation of our capabilities</h2>
                <h3 className="hp">Capability Summary:</h3>
                <p className="p">
                    SS Fixturing is an outstanding provider of strategic technology and solutions to the industrial field. Our services are organized in four areas:
                </p>
                <ul className="p">
                    <li>New Technology Solutions</li>
                    <li>Rock Bottom Prices</li>
                    <li>Budget Friendly</li>
                    <li>Customer Support Always</li>
                </ul>

                <h3 className="hp">What sets SS Fixturing apart from the competition?</h3>
                <ul className="p">
                    <li>Our People</li>
                    <li>Performance-Based Processes</li>
                    <li>Integrated Solutions, Teams</li>
                    <li>Client Relationship Management</li>
                    <li>Strategic Mix of Technology and Business</li>
                </ul>

                <h2 className="hp">Solutions</h2>

                <p className="p">
                    Our expert technology professionals and business professionals analyze, research, design, and implement solutions in multiple areas:
                </p>

                <ul className="p">
                    <li>Best Fixture Planning Support</li>
                    <li>Friendly Commercials & Cost Breakdown</li>
                    <li>Concept & Design Solution</li>
                    <li>Maintain Best Fixture, Manufacturing Support</li>
                </ul>

                <br />

                <p style={{ color: 'white', fontSize: '20px' }}>
                    SS Fixturing<br />
                    Precision Redefined, Excellence Delivered!
                </p>
            </div>
        </div>
        <Footer/>
        </>
    )
}