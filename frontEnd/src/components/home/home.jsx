// import Slider from './Slider';
import React, { useEffect } from 'react';
import ProductBoxes from './productbox';
import FeatureBoxes from './features';
import SlideImage from './slideimg';
import Navbar from '../includes/navbar';
import Footer from '../includes/footer';
import '../css/home.css'
import '../css/splash.css'
import weblogo from '../images/logo.gif'
import slogan from '../images/slogan.gif'
import HomeHead from '../homehead';
import Loader from '../loader';


export default function home({}){

  useEffect(() => {
    const timer = setTimeout(() => {
      const splashScreen = document.getElementById('splash-screen');
      if (splashScreen) {
        splashScreen.style.display = 'none';
      }
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

    return(
        <div className='content'>

        <HomeHead
        title="Hydraulic VMC&HMC Fixture  Manufacturer-SS Fixturing"
        descriptions="Explore SS Fixturing, Pune's top provider of precision fixtures for VMC and HMC. 
        Enhance machining centers with efficient clamping solutions and superior quality." 
        />

        {/* <Loader/> */}
  
        <div className="intro">
          <h1>SS FIXTURING</h1>
          <p className="INT1">Make the component, next level.</p>
          <p className="JUST">
            Welcome to SS Fixturing, where precision meets perfection. Our VMC, HMC hydraulic and Mechanical fixtures are specifically designed to provide efficient and precise clamping for vertical machining centers (VMC) and horizontal machining centers (HMC). These fixtures are essential tools for maximizing productivity and ensuring accuracy in machining operations.
            <br />
            Trust SS Fixturing for precision solutions that transform your ideas into reality.
          </p>
        </div>
  
        <SlideImage />
  
        <ProductBoxes />
  
        <div className="mclassp">
          <div className="paragraph-container">
            <div className="paragraph">
              <h4>VMC HYDRAULIC FIXTURE</h4>
              <p className="pstyle">
                The VMC hydraulic fixture is designed to provide secure and stable clamping for different machining operations.
                It is compatible with VMC machines, ensuring seamless integration and optimal performance.
                The fixture is made from high-quality materials to ensure durability and long-lasting performance.
                It features a hydraulic clamping system that allows for quick and easy setup and adjustment.
                <br />
                The fixture is designed to provide excellent stability and vibration damping, resulting in improved machining accuracy and surface finish.
                It is equipped with a variety of clamping options and accessories to accommodate different work pieces and machining requirements.
              </p>
            </div>
            <div className="paragraph">
              <h4>HMC HYDRAULIC FIXTURE</h4>
              <p className="pstyle">
                The HMC Hydraulic Fixture is a versatile and reliable solution for clamping work pieces in HMC (Horizontal Machining Center) machines.
                With its advanced features and precision engineering, the HMC Hydraulic Fixture offers numerous advantages for complex machining operations. Specifically designed to work seamlessly with HMC machines, Ensuring Optimal performance and efficiency.
                Provides precise and repeatable clamping for accurate machining operations.
                <br />
                High-quality and durable materials for long-lasting performance.
                Compact and lightweight design for easy installation and handling.
              </p>
            </div>
          </div>
        </div>
  
        <FeatureBoxes />
        <Footer />
      </div>
    )
}