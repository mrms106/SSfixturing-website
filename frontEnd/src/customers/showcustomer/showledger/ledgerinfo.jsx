import html2pdf from "html2pdf.js";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import web from "../../web";
export default function LedgerInfo({totalCreditedAmount,totalGrandTotal,billsState,handleCreditedAmountChange,logo,customer}){
    const [amounts, setAmounts] = useState({
        totalAmount: totalGrandTotal || 0,
        creditAmount: totalCreditedAmount || 0,
        pendingAmount: (totalGrandTotal - totalCreditedAmount).toFixed(2) || 0,
    });
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

    // Whenever totalGrandTotal or totalCreditedAmount changes, recalculate `amounts`
    useEffect(() => {
        const pendingAmount = (totalGrandTotal - totalCreditedAmount).toFixed(2) || 0;
        setAmounts({
            totalAmount: totalGrandTotal,
            creditAmount: totalCreditedAmount,
            pendingAmount: pendingAmount,
        });
    }, [totalGrandTotal, totalCreditedAmount]); // Re-run if these props change

     const downloadPDF = () => {
            const element = document.querySelector(".show-ledger");
        
            if (!element) {
                alert("Bill element not found");
                return;
            }
        
            const opt = {
                margin: [0.1, 0.1, 0.1, 0.1], // Updated margins: top 0.1, left 1, others unchanged
                filename: `${customer.name}-ledger.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: {
                    scale: 2, // Use a higher scale for better quality
                    useCORS: true, // Allow cross-origin images
                    allowTaint: true, // Allow images outside the domain
                    
                },
                jsPDF: {
                    unit: "in",
                    format: "tabloid",
                    orientation: "landscape",
                },
            };
        
            // Delay execution slightly to ensure all content is rendered
            setTimeout(() => {
                html2pdf()
                    .set(opt)
                    .from(element)
                    .save()
                    .catch((err) => console.error("PDF generation error:", err));
            }, 500); // Delay of 500ms
        };
    return(
        <>
        <div className="show-ledger">
            <div className="show-ledger-main">
                <div className="ledger-horizontal-one">OUTSTANDING PAYMENT LEDGER <img src={logo} alt="ssfixturing-logo"/></div>
                <div className="ledger-horizontal-two">
                    <div className="ledger-horizontal-two-one">
                        <div className="ledger-horizontal-two-one-one ledger-horizontal-two-similar-one">Account of:</div>
                        <div className="ledger-horizontal-two-one-two ledger-horizontal-two-similar-two">S S FIXTURING</div>
                    </div>
                    <div className="ledger-horizontal-two-two">
                        <div className="ledger-horizontal-two-two-one ledger-horizontal-two-similar-one">Address:</div>
                        <div className="ledger-horizontal-two-two-one ledger-horizontal-two-similar-two">Shop No. 11, Sr. No. 4/4, Gurudev Datta Colony No, 03, Bhosari, Pune, Maharastra- 411039</div>
                    </div>
                    <div className="ledger-horizontal-two-three">
                        <div className="ledger-horizontal-two-three-one ledger-horizontal-two-similar-one">Contact Per. Name/No. :</div>
                        <div className="ledger-horizontal-two-three-two ledger-horizontal-two-similar-two">Mr. Shubham Shinde / +91-960-4233-567 / +91-928-4550-570 /</div>
                    </div>
                    <div className="ledger-horizontal-two-four">
                        <div className="ledger-horizontal-two-four-one ledger-horizontal-two-similar-one"> Mail Id./website :</div>
                        <div className="ledger-horizontal-two-four-two ledger-horizontal-two-similar-two"> ssfixturing1@gmail.com/ www.ssfixturing.com</div>
                    </div>
                </div>
                <div className="ledger-horizontal-three">
                    <div className="ledger-horizontal-three-one">
                        <div className="ledger-horizontal-three-one-one">Sr. No</div>
                        <div className="ledger-horizontal-three-one-two">Invoce Date</div>
                        <div className="ledger-horizontal-three-one-three">Particulars</div>
                        <div className="ledger-horizontal-three-one-four"> Debit Amount</div>
                        <div className="ledger-horizontal-three-one-five">Qty</div>
                        <div className="ledger-horizontal-three-one-six">Total Amount</div>
                        <div className="ledger-horizontal-three-one-seven">Credit Amount</div>
                        <div className="ledger-horizontal-three-one-eight"> Cr./Dr.</div>
                        <div className="ledger-horizontal-three-one-nine">Balance</div>
                    </div>
                    {
                   billsState && billsState.map((bill,idx)=>(
                    <div className="ledger-horizontal-three-two">
                        <div className="ledger-horizontal-three-two-one">{idx+1}</div>
                        <div className="ledger-horizontal-three-two-two">{bill.invoicedate}</div>
                        <div className="ledger-horizontal-three-two-three">invoice NO:{bill.invoiceNo}</div>
                        <div className="ledger-horizontal-three-two-four"> {bill.grandTotal}</div>
                        <div className="ledger-horizontal-three-two-five">
                            {
                                bill.item.reduce(
                                    (sum, currentItem) => sum + parseInt(currentItem.quantity || 0), 
                                    0
                                  )
                            }
                        </div>
                        <div className="ledger-horizontal-three-two-six">{bill.grandTotal}</div>
                        <div className="ledger-horizontal-three-two-seven">
                            <input
                                type="number"
                                value={bill.creditedAmount || 0}
                                onChange={(e) =>
                                    handleCreditedAmountChange(bill.billId, parseFloat(e.target.value) || 0)
                                }
                            />                   
                        </div>
                        <div className="ledger-horizontal-three-two-eight"> Cr.</div>
                        <div className="ledger-horizontal-three-two-nine">{(bill.grandTotal - bill.creditedAmount).toFixed(2)}</div>
                    </div>
                    ))
                    }
                     <div className="ledger-horizontal-three-three">
                        <div className="ledger-horizontal-three-three-one">Sub Total Amount</div>
                        <div className="ledger-horizontal-three-three-two"></div>
                        <div className="ledger-horizontal-three-three-three"></div>
                        <div className="ledger-horizontal-three-three-four"> 0.00</div>
                        <div className="ledger-horizontal-three-three-five"></div>
                        <div className="ledger-horizontal-three-three-six" name="totalAmount">{amounts.totalAmount}</div>
                        <div className="ledger-horizontal-three-three-seven" name="creditAmount">
                        {amounts.creditAmount}
                        </div>
                        <div className="ledger-horizontal-three-three-eight"></div>
                        <div className="ledger-horizontal-three-three-nine" name="pendingAmount">  {amounts.pendingAmount} RS</div>
                    </div>
                </div>
                <div className="ledger-horizontal-four">
                    Make your component, Next level…
                </div>
            </div>
           
        </div>
        <button onClick={downloadPDF}>download pdf</button>
        </>
    )
}