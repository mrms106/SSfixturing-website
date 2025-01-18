import React, { useEffect, useState } from 'react';

export default function CreateBill({customer,setcreatebill}) {
  const[btn,setbtn]=useState(false)
  const [formData, setFormData] = useState({
    cname:'',
    caddress:'',
    cgst:'',
    cmail:'',
    cContact:'',
    serialNo:'',
    invoiceNo: '',
    PoNo: '',
    invoicedate: '',
    Podate: '',
    description: '',
    hsn: '',
    unitRate: '',
    Qty: '',
    UOM: '',
    disc: '',
    tax: '',
    totalAmount: '',
    taxamount: '',
    grandTotal: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotals = () => {
    
    const { unitRate, Qty, disc, tax } = formData;
    const rate = parseFloat(unitRate) || 0;
    const quantity = parseFloat(Qty) || 0;
    const discount = parseFloat(disc) || 0;
    const taxRate = parseFloat(tax) || 0;

    const totalAmount = rate * quantity;
    const discountedAmount = totalAmount - (totalAmount * discount) / 100;
    const taxAmount = (discountedAmount * taxRate) / 100;
    const grandTotal = discountedAmount + taxAmount;

    setFormData({
      ...formData,
      totalAmount: totalAmount.toFixed(2),
      taxamount: taxAmount.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
      basicvalue:discountedAmount.toFixed(2),
      cname:customer.name,
      caddress:customer.address,
      cgst:customer.gstNo,
      cmail:customer.email,
       cContact:customer.contact,
      serialNo:customer.serialNO,
    });
    setbtn(true)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

   try{

    const responce=await fetch("http://localhost:8080/api/createbill",{
        method:'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify(formData)
    })
    if(responce.ok){
        alert("the bill is created")
        setcreatebill(true)
        return;
    }
    alert("problem in creating the bill")

   }catch(err){
      console.log(err)
      alert(err)
   }
  };


  return (
    <>
      <div className="addcustomer-main">
       <div className='addcustomer-close-btn'><button onClick={()=>setcreatebill(true)}>Close</button> <h3>Create Bill</h3></div>
        <form onSubmit={handleSubmit}>
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

            <label>PO No</label>
            <input
              type="text"
              name="PoNo"
              placeholder="Enter PO no."
              required
              value={formData.PoNo}
              onChange={handleChange}
            />

            <label>Invoice Date</label>
            <input
              type="date"
              name="invoicedate"
              required
              value={formData.invoicedate}
              onChange={handleChange}
            />

            <label>PO Date</label>
            <input
              type="date"
              name="Podate"
              required
              value={formData.Podate}
              onChange={handleChange}
            />

            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              required
              value={formData.description}
              onChange={handleChange}
            />
              <label>HSN</label>
            <input
              type="text"
              name="hsn"
              placeholder="Enter HSN"
              required
              value={formData.hsn}
              onChange={handleChange}
            />

          </div>

          <div>
          
            <label>Unit Rate</label>
            <input
              type="text"
              name="unitRate"
              placeholder="Enter unit rate"
              required
              value={formData.unitRate}
              onChange={handleChange}
            />

            <label>Quantity</label>
            <input
              type="number"
              name="Qty"
              placeholder="Enter quantity"
              required
              value={formData.Qty}
              onChange={handleChange}
            />

            <label>UOM</label>
            <input
              type="text"
              name="UOM"
              placeholder="Enter UOM"
              required
              value={formData.UOM}
              onChange={handleChange}
            />

            <label>Discount (%)</label>
            <input
              type="number"
              name="disc"
              placeholder="Enter discount"
              required
              value={formData.disc}
              onChange={handleChange}
            />

            <label>Tax (%)</label>
            <input
              type="number"
              name="tax"
              placeholder="Enter tax"
              required
              value={formData.tax}
              onChange={handleChange}
            />

            { btn ? <button type="submit">Create Bill</button>:
             <div onClick={()=>calculateTotals()} className='customer-show-btn'>Calculate-prices</div>}
            
          </div>       
        </form>
        
      </div>  
    </>
  );
}
