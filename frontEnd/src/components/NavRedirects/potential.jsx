import '../css/about.css'
import Footer from '../includes/footer'

export default function potential(){
    return(
        <>
          <div className="navItem-Body">
            <div className="text-container">
                <h2 className="hp" style={{ marginTop: '50px' }}>Potential</h2><br />

                <hr style={{ border: '0.5px outset white', borderWidth: '10%', width: '100%', margin: '10px auto' }} />

                <ol>
                    <li className="hp">
                        Potential MITR Machine [drilling Machine] [02 quantity.]
                        <ul className="p">
                            <li>1370 x 254mm</li>
                            <li><strong>X= 860mm</strong></li>
                            <li>Y= 400 mm</li>
                            <li>Z=405 mm</li>
                            <li>RAM Travel=580 mm</li>
                        </ul>
                    </li>

                    <br />

                    <li className="hp">
                        Milling Machine [FBM-35] [02 Qty]
                        <ul className="p">
                            <li>1370 x 305 mm (54"x12")</li>
                            <li>600 Kgs.</li>
                            <li>STC=460mm</li>
                            <li>X = 760mm</li>
                            <li>Y=500mm</li>
                            <li>Z=520mm</li>
                        </ul>
                    </li>

                    <br />

                    <li className="hp">
                        Electric Tapping Machine [029 quantity]
                        <ul className="p">
                            <li>Vertical Tapping Machine</li>
                            <li>Universal Machine</li>
                        </ul>
                    </li>

                    <br />

                    <li className="hp">
                        Measuring Instrument
                        <ul className="p">
                            <li>Digital Height Gauge</li>
                            <li>ASE Tapping Gauge</li>
                            <li>Depth Micrometer</li>
                            <li>Length and Width Micrometer etc. All types for daily use.</li>
                        </ul>
                    </li>
                </ol>

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