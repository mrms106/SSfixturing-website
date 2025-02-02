import React, { useState,useEffect } from 'react';
import BillInput from './billinput';
import Swal from 'sweetalert2';
import web from '../web';


export default function CreateBill({ customer, setcreatebill,fetchBill }) {
  const [formData, setFormData] = useState({
    cname: customer.name,
    caddressbillto: customer.addressBillto,
    caddresssupplyto:customer.addressSypplyto,
    statecode:customer.Statecode,
    cgst: customer.gstNo,
    cmail: customer.email,
    cContact: customer.contact,
    serialNo: customer.serialNO,
    invoiceNo: '',
    PoNo: '',
    invoicedate: '',
    invoicetime:'',
    Podate: '',
    isOutside:false,
    item: [
      {
        description: '',
        unitRate: '',
        quantity: '',
        discount: '',
        totalAmount: 0, // Store calculated total
        discountAmount: 0, // Store the discount amount separately
      },
    ],
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${web}/createbill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials:'include'
      });

      if (response.ok) {
        Swal.fire({
          title: ' Successful',
          text:  'You have successfully created  the bill!',
          icon: 'success',  
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonText: 'OK'
      })
        fetchBill()
        setcreatebill(true);
        return;
      }

      Swal.fire({
        title: ' Failed',
        text:  'failed to create bill. Please try again.',
        icon: 'error',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'OK'
    });
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
    <BillInput handleSubmit={handleSubmit} value="create" customer={customer} formData={formData} setFormData={setFormData} />
    </div>
  );
}
