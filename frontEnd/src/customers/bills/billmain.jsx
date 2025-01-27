import React, { useState,useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CreateBill({ customer, setcreatebill,fetchBill }) {
  const [IsOutside, setIsOutside] = useState(false);
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
// Sync IsOutside state with formData
useEffect(() => {
  setFormData((prev) => ({
    ...prev,
    isOutside: IsOutside,
  }));
}, [IsOutside]);
  // Handle changes in form fields
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      // Update item array
      const updatedItems = [...formData.item];
      updatedItems[index][name] = value;
      setFormData({ ...formData, item: updatedItems });
    } else {
      // Update top-level fields
      setFormData({ ...formData, [name]: value });
    }
  };
console.log(IsOutside)
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

  const addItem = () => {
    setFormData({
      ...formData,
      item: [
        ...formData.item,
        { description: '',  unitRate: '', quantity: '',  discount: '' },
      ],
    });
  };
  const removeItem = (index) => {
    const updatedItems = formData.item.filter((_, i) => i !== index);
    setFormData({ ...formData, item: updatedItems });
  };
  return (
    <div className="addcustomer-main">
      <div className="addcustomer-close-btn">
        <button onClick={() => setcreatebill(true)}>Close</button>
        <h3>Create Bill</h3>
        
      </div>
      <form onSubmit={handleSubmit} className='create-bill-form'>
        <div className='create-bill-form-div1'>
         <div>
         <label>Invoice No</label>
          <input
            type="text"
            name="invoiceNo"
            placeholder="Enter invoice no."
            required
            value={formData.invoiceNo}
            onChange={handleChange}
          />
         </div>

         <div>
         <label>PO No</label>
          <input
            type="text"
            name="PoNo"
            placeholder="Enter PO no."
            required
            value={formData.PoNo}
            onChange={handleChange}
          />
         </div>

         <div>
         <label>Invoice Date</label>
          <input
            type="date"
            name="invoicedate"
            required
            value={formData.invoicedate}
            onChange={handleChange}
          />
         </div>

          <div>
          <label>PO Date</label>
          <input
            type="date"
            name="Podate"
            required
            value={formData.Podate}
            onChange={handleChange}
          />
          </div>
         
        </div>
        <div style={{marginRight:'90%'}}>
        <FormControlLabel
            control={<Switch checked={IsOutside} onChange={() => setIsOutside(!IsOutside)} />}
            label="IsOutside"
          />
            
          </div>
        {formData.item.map((item, index) => (
          <>
          <h3>Product {index+1}</h3>
          <div key={index} className='create-bill-form-div2'>
            {/* <h3>item {index+1}</h3> */}
            <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              required
              value={item.description}
              onChange={(e) => handleChange(e, index)}
            />
            </div>

            <div>
            <label>Unit Rate</label>
            <input
              type="text"
              name="unitRate"
              placeholder="Enter unit rate"
              required
              value={item.unitRate}
              onChange={(e) => handleChange(e, index)}
            />
            </div>

           <div>
           <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              required
              value={item.quantity}
              onChange={(e) => handleChange(e, index)}
            />
           </div>

           
           <div>
           <label>Discount (%)</label>
            <input
              type="number"
              name="discount"
              placeholder="Enter discount"
              required
              value={item.discount}
              onChange={(e) => handleChange(e, index)}
            />
           </div>
           <button type="button" onClick={() => removeItem(index)}>
              Remove Item
            </button>
          </div></>
        ))}
        

        <div className='create-bill-form-buttons'>
        <button type="button" onClick={addItem}>
          Add Item
        </button>
        <button type="submit">Create Bill</button>
        </div>
        
      </form>
    </div>
  );
}
