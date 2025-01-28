import { useEffect, useState } from "react";
import BillInput from "./billinput";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';


export default function UpdateBill(){
    const {billId}=useParams()
     const [formData, setFormData] = useState({
        cname: '',
        caddress: '',
        cgst:'',
        cmail: '',
        cContact:'',
        serialNo: '',
        invoiceNo: '',
        PoNo: '',
        invoicedate: '',
        Podate: '',
        isOutside:'',
        item: [
          {
            description: '',
            unitRate: '',
            quantity: '',
            discount: '',
          },
        ],
      });
      const fetchbill = async () => {
        if (!billId) {
            alert("Invoice number is missing");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8080/api/bill/${billId}`);
            if (!response.ok) {
                alert("Problem in fetching the bill");
                return;
            }
            const data = await response.json();
            setFormData(data.data);
          
        } catch (err) {
            alert(err.message || "An error occurred");
        }
    };
    console.log(formData)
    useEffect(()=>{
fetchbill()
    },[])
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:8080/api/bill/${billId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials:'include',
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            Swal.fire({
              title: ' Successful',
              text: 'You have successfully udated the bill!',
              icon: 'success',  
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonText: 'OK'
          })
           
         
            return;
          }
    
          Swal.fire({
            title: ' Failed',
            text: 'faild to update the bill. Please try again.',
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

    return(
        <>
           <div className="addcustomer-main">
                <div className="addcustomer-close-btn">
                  <h3>Update  Bill</h3>
                  
                </div>
              <BillInput handleSubmit={handleSubmit} value="update" formData={formData} setFormData={setFormData}/>
            </div>
        </>
    )
}