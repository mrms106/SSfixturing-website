import '../css/about.css'
import Footer from '../includes/footer'
import HomeHead from '../homehead'

export default function pricing(){
    return(
        <>
        <HomeHead
          title="Pricing - SS Fixturing"
          description="Check out the competitive pricing for SS Fixturing's precision VMC and HMC fixtures. Quality and affordability combined."
        />
           <div className=" pricing-body">
            <div className="text-container">
                <h2 className="hp" style={{ marginTop: '50px' }}>Pricing and Packages</h2>
                <br />
                <hr style={{ border: '0.5px outset white', borderWidth: '10%', width: '100%', margin: '10px auto' }} />
                
                <p className="p">
                    We offer a range of pricing and package options for our VMC and HMC hydraulic fixtures, designed to meet the needs and budgets of our customers.
                </p>

                <h3 className="hp">Standard Package:</h3>
                <p className="p">
                    Our standard package includes the VMC or HMC hydraulic fixture, along with all necessary components and accessories for installation and operation. This package is perfect for customers who require a reliable and cost-effective solution for their machining needs.
                </p>

                <h3 className="hp">Premium Package:</h3>
                <p className="p">
                    For customers who require additional features and capabilities, we offer a premium package. This package includes the VMC or HMC hydraulic fixture with advanced functionality, enhanced precision, and increased productivity. The premium package is ideal for customers who demand the highest level of performance from their machining equipment.
                </p>

                <h3 className="hp">Discounts and Special Offers:</h3>
                <p className="p">
                    We offer various discounts and special offers to provide additional value to our customers. These include:
                    <br />
                    <strong>Volume Discounts:</strong> Customers who purchase multiple VMC or HMC hydraulic fixtures can enjoy discounted pricing based on the quantity ordered.
                    <br />
                    <strong>Promotional Offers:</strong> We periodically run promotional offers and sales events, providing customers with the opportunity to save on their purchase of VMC or HMC hydraulic fixtures.
                    <br />
                    <strong>Bundle Deals:</strong> Customers who bundle their VMC or HMC hydraulic fixture purchase with other products or services may be eligible for special package pricing.
                </p>

                <h3 className="hp">Value and Cost-Effectiveness:</h3>
                <p className="p">
                    Our VMC and HMC hydraulic fixtures offer exceptional value and cost-effectiveness for our customers. With their high-quality construction, advanced functionality, and reliable performance, these fixtures provide a long-lasting and efficient solution for machining operations. By investing in our hydraulic fixtures, customers can improve productivity, reduce downtime, and achieve superior machining results, ultimately leading to increased profitability.
                </p>

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