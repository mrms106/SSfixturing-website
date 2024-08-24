
import React from 'react';

import fast from '../images/home/feature/fast.png'
import guarentee from '../images/home/feature/guarentee.png'
import long from '../images/home/feature/long.png'
import project from '../images/home/feature/project.png'
import '../css/feature.css'

const FeatureBoxes = () => {
  return (
    <div className="mclassbox">
      <div className="box-containers">
        <div className="boxs">
          <div className="box-header">
            <h2><img src={fast} alt="img" loading="lazy" /></h2>
          </div>
          <div className="box-body">
            <p className="textx">FASTER INITIAL QUOTES AND CONCEPT DESIGN</p>
          </div>
        </div>

        <div className="boxs">
          <div className="box-header">
            <h2><img src={long} alt="img" loading="lazy" /></h2>
          </div>
          <div className="box-body">
            <p className="textx">LONG TERM CUSTOMER THROUGH FIXTURES FOR LONG TERM</p>
          </div>
        </div>

        <div className="boxs">
          <div className="box-header">
            <h2><img src={guarentee} alt="img" loading="lazy" /></h2>
          </div>
          <div className="box-body">
            <p className="textx">GUARANTEED LEAD TIME & ON THE SHOP FLOOR SUPPORT</p>
          </div>
        </div>

        <div className="boxs">
          <div className="box-header">
            <h2><img src={project} alt="img" loading="lazy" /></h2>
          </div>
          <div className="box-body">
            <p className="textx">DEDICATED PROJECT MANAGER AND FASTER PROVE OUT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBoxes;
    