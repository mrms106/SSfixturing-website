import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useState,useEffect } from 'react';

export default function BillInput({formData,handleSubmit,setFormData,value}){
     const [IsOutside, setIsOutside] = useState(false);
    
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
      
        setFormData((prevFormData) => {
          if (index !== null) {
            // Update the item array
            const updatedItems = prevFormData.item.map((item, i) => {
              if (i === index) {
                const updatedItem = { ...item, [name]: value };
      
                // Convert values to numbers
                const unitRate = parseFloat(updatedItem.unitRate) || 0;
                const quantity = parseFloat(updatedItem.quantity) || 0;
                const discountPercentage = parseFloat(updatedItem.discount) || 0;
      
                // Calculate total before discount
                const totalBeforeDiscount = unitRate * quantity;
      
                // Calculate discount amount as a percentage of totalBeforeDiscount
                const discountAmount = (discountPercentage / 100) * totalBeforeDiscount;
      
                // Ensure the discount is not greater than totalBeforeDiscount
                const finalTotal = totalBeforeDiscount - discountAmount;
      
                // Update values
                updatedItem.totalAmount = finalTotal;
                updatedItem.discountAmount = discountAmount; // Store discount separately
      
                return updatedItem;
              }
              return item;
            });
      
            return { ...prevFormData, item: updatedItems };
          } else {
            // Update non-item fields
            return { ...prevFormData, [name]: value };
          }
        });
      };
      
      
    console.log(IsOutside)
    const addItem = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        item: [
          ...prevFormData.item,
          {
            description: '',
            unitRate: '',
            quantity: '',
            discount: '',
            totalAmount: 0,  // Initialize with 0
            discountAmount: 0, // Initialize with 0
          },
        ],
      }));
    };
    const removeItem = (index) => {
      setFormData((prevFormData) => {
        const updatedItems = prevFormData.item.filter((_, i) => i !== index);
        return { ...prevFormData, item: updatedItems };
      });
    };
        
    return(
        <>
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
         <label>Invoice Time</label>
          <input
            type="Time"
            name="invoicetime"
            required
            value={formData.invoicetime}
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
              {/* Display calculated discount amount */}
    <div>
      <label>Discount Amount</label>
      <input
        type="text"
        value={item.discountAmount}
        readOnly
      />
    </div>

    {/* Display calculated totalAmount */}
    <div>
      <label>Total Amount</label>
      <input
        type="text"
        value={item.totalAmount}
        readOnly
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
        <button type="submit">{value} Bill</button>
        </div>
        
      </form>
        </>
    )
}