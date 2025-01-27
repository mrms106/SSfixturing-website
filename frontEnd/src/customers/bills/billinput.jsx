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
        <button type="submit">{value} Bill</button>
        </div>
        
      </form>
        </>
    )
}