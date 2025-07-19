import { useState,useEffect } from "react";
import web from "../../web";
import DeleteButton from '../../../components/bill/deleteButton'

export default function CreditA({creditMap,customer,amounts,bill,fetchBill,getCreditDataByBillId,updateledger}){
      const[showinputs,setshowinputs]=useState(false)
        const [creditInputs, setCreditInputs] = useState({});
      
    const handleCreditInputChange = (billId, field, value) => {
      setCreditInputs((prev) => ({
        ...prev,
        [billId]: {
          ...prev[billId],
          [field]: value
        }
      }));
    };
    console.log(creditMap,"sdlkmkl")
    const submitCreditEntry = async (billId) => {
      const { date, amount } = creditInputs[billId] || {};
    
      if (!date || !amount) return alert("Date and amount required!");
    
      try {
        const res = await fetch(`${web}/credita/add/${billId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ date, amount })
        });
    
        const data = await res.json();
        setshowinputs(false)
         fetchBill()
         getCreditDataByBillId()
      } catch (err) {
        console.error("Error adding credit:", err);
      }
    };
    
    
    
        const serialNo=customer.serialNO
        console.log(serialNo)
         // Function to call the backend API to update amounts
         const updateAmounts = async () => {
            try {
                const response = await fetch(`${web}/customer/${serialNo}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials:'include',
                    body: JSON.stringify(amounts),
                });
    
                if (response.ok) {
                    console.log("Amounts updated successfully");
                } else {
                    console.error("Failed to update amounts");
                }
            } catch (error) {
                console.error("Error updating amounts:", error);
            }
        };
    
        // Automatically call the API whenever `amounts` change
        useEffect(() => {
            updateAmounts();
        }, [amounts]); 

    // for delete entry
const deleteEntry = async (billId, index) => {
  try {
    const response = await fetch(`${web}/credita/delete-entry/${billId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ index }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      fetchBill()
      getCreditDataByBillId()
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (err) {
    console.error('Delete failed:', err);
    alert('Failed to delete entry.');
  }
};


    return(
        <>
         <div className="ledger-horizontal-three-two-seven">
                    {creditMap[bill.billId] && creditMap[bill.billId].length > 0 && (
                        <>
                        {creditMap[bill.billId] &&
                        [...creditMap[bill.billId]]
                            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date ascending
                            .map((entry, idx) => (
                            <div className="ledger-horizontal-three-two-seven-one" key={idx}>  
                                <div className="ledger-horizontal-three-two-seven-one-one">{entry.date}</div>
                                {/* <div className="ledger-horizontal-three-two-seven-one-btn">delete</div> */}
                                {updateledger?
                                <DeleteButton pdf={bill} index={idx} date={`${entry.date} this date entry`} handleDelete={deleteEntry}/>: null}
                                <div className="ledger-horizontal-three-two-seven-one-two">₹{entry.amount}</div>
                            </div>
                            ))}
                        </>
                    
                    )}
                    { showinputs && updateledger ?
                        <div className="ledger-horizontal-three-two-seven-one">    
                            <div className="ledger-horizontal-three-two-seven-one-one">
                                <input 
                                        type="date" 
                                        onChange={(e) => handleCreditInputChange(bill.billId, 'date', e.target.value)}
                                    />
                            </div>
                            <div className="ledger-horizontal-three-two-seven-one-two">
                            <input type="number" placeholder="enter amount" onChange={(e) => handleCreditInputChange(bill.billId, 'amount', e.target.value)}
                                /> 
                            </div>
                      </div> : null
                    }
                    <div className="ledger-horizontal-three-two-seven-two">
                        {
                            showinputs && updateledger ?
                            <div className="ledger-horizontal-three-two-seven-two-btn"onClick={() => submitCreditEntry(bill.billId)}>update</div>:
                        updateledger ?    <div className="ledger-horizontal-three-two-seven-two-btn"onClick={()=>setshowinputs(true)}>Add</div> :null
                        }
                        <div className="ledger-horizontal-three-two-seven-two-total">
                            <b>₹
                            {creditMap[bill.billId] && creditMap[bill.billId].length > 0
                                ? creditMap[bill.billId].reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0).toFixed(2)
                                : (bill.creditedAmount || 0).toFixed(2)}</b>
                        </div>
                    </div>
                                    
             </div>
        </>
    )
}