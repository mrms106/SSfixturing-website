import { useNavigate } from 'react-router-dom';
import '../css/productbox.css'

import React from 'react';

const ProductBoxes = () => {
  const navigate = useNavigate();
  return (
    <div className="mclassb">
    <div className="box-container">
      <div className="box" onClick={() => navigate('/HydraulicFixture')}>
        <span className="texts">HYDRAULIC FIXTURE</span>
      </div>
      <div className="box" onClick={() => navigate('/MechanicalFixture')}>
        <span className="texts">MECHANICAL FIXTURE</span>
      </div>
      <div className="box" onClick={() => navigate('/WeldingFixture')}>
        <span className="texts">WELDING FIXTURE</span>
      </div>
      <div className="box" onClick={() => navigate('/assemblyFixture')}>
        <span className="texts">ASSEMBLY FIXTURE</span>
      </div>
      <div className="box" onClick={() => navigate('/HydralicPowerPack')}>
        <span className="texts">HYDRAULIC POWER PACK</span>
      </div>
    </div>
  </div>
  );
};

export default ProductBoxes;
