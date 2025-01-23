
import React from 'react';
import '../css/feature.css'

const FeatureBoxes = () => {
  const fast='https://res.cloudinary.com/dpgod55rr/image/upload/v1737608711/ssfixturing/homepage/feature/fast_gscnjq.png'
  const guarentee='https://res.cloudinary.com/dpgod55rr/image/upload/v1737608714/ssfixturing/homepage/feature/guarentee_k2yd5u.png'
  const long='https://res.cloudinary.com/dpgod55rr/image/upload/v1737608716/ssfixturing/homepage/feature/long_fxaj8l.png'
  const project='https://res.cloudinary.com/dpgod55rr/image/upload/v1737608718/ssfixturing/homepage/feature/project_wcunaa.png'
  return (
    <div className="mclassbox">
      <div className="box-containers">
        <div className="boxs">
          <div className="box-header">
            <h2><img src={fast} alt="img" loading="lazy" width="80" height="50" /></h2>
          </div>
          <div className="box-body">
            <p className="textx">FASTER INITIAL QUOTES AND CONCEPT DESIGN</p>
          </div>
        </div>

        <div className="boxs">
          <div className="box-header">
            <h2><img src={long} alt="img" loading="lazy" width="80" height="50" /></h2>
          </div>
          <div className="box-body">
            <p className="textx">LONG TERM CUSTOMER THROUGH FIXTURES FOR LONG TERM</p>
          </div>
        </div>

        <div className="boxs">
          <div className="box-header">
            <h2><img src={guarentee} alt="img" loading="lazy" width="80" height="50"/></h2>
          </div>
          <div className="box-body">
            <p className="textx">GUARANTEED LEAD TIME & ON THE SHOP FLOOR SUPPORT</p>
          </div>
        </div>

        <div className="boxs">
          <div className="box-header">
            <h2><img src={project} alt="img" loading="lazy" width="80" height="50" /></h2>
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
    