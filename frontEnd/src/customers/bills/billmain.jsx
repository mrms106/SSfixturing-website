import React, { useState,useEffect } from 'react';
import BillInput from './billinput';

export default function CreateBill({ customer, setcreatebill,fetchBill }) {
  const [formData, setFormData] = useState({
    cname: customer.name,
    caddress: customer.address,
    cgst: customer.gstNo,
    cmail: customer.email,
    cContact: customer.contact,
    serialNo: customer.serialNO,
    invoiceNo: '',
    PoNo: '',
    invoicedate: '',
    Podate: '',
    isOutside:false,
    item: [
      {
        description: '',
        unitRate: '',
        quantity: '',
        discount: '',
      },
    ],
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/createbill", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("The bill has been created successfully");
        fetchBill()
        setcreatebill(true);
        return;
      }

      alert("Problem creating the bill");
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  
  return (
    <div className="addcustomer-main">
      <div className="addcustomer-close-btn">
        <button onClick={() => setcreatebill(true)}>Close</button>
        <h3>Create Bill</h3>
        
      </div>
    <BillInput handleSubmit={handleSubmit} customer={customer} formData={formData} setFormData={setFormData}/>
    </div>
  );
}
