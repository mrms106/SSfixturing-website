import { useEffect,useState } from "react"
import './showledger.css'
import LedgerInfo from "./ledgerinfo";
import web from "../../web";

export default function Showledger({bills,fetchBill,customer,fetchCustomer}){
   const logo='https://res.cloudinary.com/dpgod55rr/image/upload/v1737610088/ssfixturing/signAndlogo/sslogo_wjku27.png'
   const [billsState, setBillsState] = useState([]);

   // Sync `billsState` with the `bills` prop whenever `bills` updates
   useEffect(() => {
     setBillsState(bills);
   }, [bills]);

   useEffect(()=>{
   fetchCustomer()
   },[billsState])
 
   const handleCreditedAmountChange = async (billId, value) => {
     try {
       // Update locally for instant feedback
       const updatedBills = billsState.map((bill) => {
         if (bill.billId === billId) {
           return { ...bill, creditedAmount: value }; // Update the creditedAmount locally
         }
         return bill;
       });
 
       setBillsState(updatedBills); // Update the local state
 
       // Call the backend API to update the value
       await fetch(`${web}/bills/${billId}`, {
         method: 'PATCH',
         headers: {
           'Content-Type': 'application/json',
         },
         credentials:'include',
         body: JSON.stringify({ creditedAmount: value }),
       });
   fetchBill()
      
     } catch (error) {
       console.error(`Failed to update credited amount for billId: ${billId}`, error);
     }
   };
   // Calculate total creditedAmount and grandTotal
const totalCreditedAmount = bills.reduce(
    (sum, bill) => sum + (bill.creditedAmount ? parseFloat(bill.creditedAmount) : 0),
    0
  );
  
  const totalGrandTotal = bills.reduce(
    (sum, bill) => sum + parseFloat(bill.grandTotal),
    0
  );
const [creditMap, setCreditMap] = useState({});
// get credits amounts
  const getCreditDataByBillId = async (billId) => {
  try {
    const res = await fetch(`${web}/credita/show/${billId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // if you’re using sessions/cookies
    });

    if (!res.ok) {
      throw new Error('Failed to fetch credit data');
    }

    const data = await res.json();
    return data; // contains billId and creditAmount[]
  } catch (err) {
    console.error('Error fetching credit data:', err.message);
    return null;
  }
};
useEffect(() => {
  const fetchAllCredits = async () => {
    for (const bill of bills) {
      const creditData = await getCreditDataByBillId(bill.billId);
      if (creditData) {
        setCreditMap(prev => ({
          ...prev,
          [bill.billId]: creditData.creditAmount || []
        }));
      }
    }
  };

  if (bills.length > 0) {
    fetchAllCredits();
  }
}, [bills]);
// for credit amount
useEffect(() => {
  Object.entries(creditMap).forEach(([billId, entries]) => {
    if (entries && entries.length >= 0) {
      const total = entries.reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0);

      const bill = billsState.find(b => b.billId === billId);
      if (bill && bill.creditedAmount !== total) {
        handleCreditedAmountChange(billId, total);
      }
    }
  });
}, [creditMap]); // Re-run when credit entries change

    return(
        <>
         <LedgerInfo totalCreditedAmount={totalCreditedAmount} totalGrandTotal={totalGrandTotal}
          handleCreditedAmountChange={handleCreditedAmountChange} billsState={billsState} setBillsState={setBillsState}
          logo={logo} customer={customer} creditMap={creditMap} fetchBill={fetchBill} getCreditDataByBillId={getCreditDataByBillId}/>
        </>
    )
}