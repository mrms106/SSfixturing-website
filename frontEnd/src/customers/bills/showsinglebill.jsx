import React, { useEffect, useState } from 'react';
import './bill.css';
import { useParams } from 'react-router-dom';
import html2pdf from "html2pdf.js";
import QRCode from 'qrcode.react'; 
import numberToWords from './covrtnumber';
import TermsandCon from './t&c';
export default function ShowSingleBill() {
    const [bill,setbill]=useState({})
    const{billId}=useParams()
    const logo='https://res.cloudinary.com/dpgod55rr/image/upload/v1737610088/ssfixturing/signAndlogo/sslogo_wjku27.png'
    const sign='https://res.cloudinary.com/dpgod55rr/image/upload/v1737610086/ssfixturing/signAndlogo/SIGN_ql0gsx.png'
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
        setbill(data.data);
      
    } catch (err) {
        alert(err.message || "An error occurred");
    }
};
console.log(bill)

    useEffect(()=>{
        fetchbill()
    },[billId])
    const downloadPDF = () => {
        const element = document.querySelector(".showsinglbill");
    
        if (!element) {
            alert("Bill element not found");
            return;
        }
    
        const opt = {
            margin: [0.1, 0.1, 0.1, 0.1], // Updated margins: top 0.1, left 1, others unchanged
            filename: `${bill.invoiceNo || "invoice"}.pdf`,
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
    
      
  return (<>
  <div className="main-siglbill-show">
    <div className="showsinglbill">
    <div className="zero-main-bill">
            <div className="zero-main-vertical">
                <span className="zero-Invoice"><i><u>TAX INVOICE</u></i></span>
                <span>Invoice No. : {bill.invoiceNo}</span> 
                <span>Invoice Date : {bill.invoicedate}</span>
                <span> Amount :  {bill.grandTotal}</span>
                <span>Original for Acknowledg</span>
            </div>
            <div className="zero-first-vertical">
                <div className="zero-horizontal1">
                    <img src={logo} alt="ssfixturing-logo" />
                  
                </div>
                
                <div className="zero-horizontal2"></div>
                <div className="zero-horizontal3">
                <QRCode   
                                value={`https://ssfixturing.com/invoice/${bill.invoiceNo}`}
                                className="bill-qr-code"
                                size={75} // Adjust size as needed
                                level="H"  // Error correction level (L, M, Q, H)
                            />
                   <div>
                    <div className="zero-c-name">
                        <b> S S Fixturing</b>
                        </div>
                        <div className="zero-c-addr">
                            <b>Works :</b> Shop No. 11, Sr. No. 4/4, Gurudev Datta Colony No, 03, Bhosari, Pune, Maharastra- 411039
                        </div>
                        <div className="zero-c-info">
                        <b> GSTIN No : 27HAOPS2617N1ZU    State : Maharashtra (027),  PAN No : HAOPS2617N.</b>
                        </div>
                        <div className="zero-c-phone">
                        <b> Tel No :</b> +91 9604233567 / +91 9284550570
                        </div>
                        <div className="zero-c-email">
                        <b> Email :</b> ssfixturing1@gmail.com/ www.ssfixturing.com
                        </div>
                    </div>
                </div>
            </div>
            <div className="zero-second-vertical">
                <div>
                    <div> <b>Invoice No.{bill.invoiceNo}</b></div>
                    <div><b>PO No. {bill.PoNo}</b></div>
                    <div><b>Whether Tax on Reverse Charge : No</b></div>
                </div>
                <div>
                    <div> <b>Invoice Date :   {bill.invoicedate}</b></div>
                    <div> <b>PO Date      :  {bill.Podate}</b></div>

                </div>

                <div>
                    <div><b>Vendor Code :</b></div>
                    <div> Challan No/Date (only in case mtl. recd against challan)</div>
                </div>

            </div>
            <div className="zero-third-vertical">
                <div style={{ padding: "5px" }} className='zero-third-vertical-box1'>
                    <div><b>Name & Address of Bill To,</b></div>
                    <div><b>{bill.cname}</b></div>
                    <div> <b>Address :</b> {bill.caddress}</div>
                    <div> <b>GSTIN No :</b> {bill.cgst}     State & State Code ; KHARSAWAN-833220,</div>
                    <div><b> Mail ID : {bill.cmail}</b></div>
                    <div><b> Contact Per :{bill.cContact}</b></div>
                </div>
                <div className="zero-third-vertical-line"></div>
                <div style={{ padding: "5px" }}>
                    <div><b>Name & Address of Supply To,</b></div>
                    <div><b>{bill.cname}</b></div>
                    <div>Address : {bill.caddress}</div>
                    <div> GSTIN No :  {bill.cgst}     State & State Code ; KHARSAWAN-833220,</div>
                    <div><b><u>Mail ID : {bill.cmail}</u></b></div>
                    <div><b>Contact Per : {bill.cContact}</b></div>
                </div>
            </div>
            <div className="zero-forth-vertical">
                <div className="zero-fourth-vertical-box">
                    <div className="zero-box zero-box1" style={{ border: "none" }}>
                        <div className="zero-sub-box1"><b>Sr. No.</b></div>
                        {
                          bill.item && bill.item.map((val,idx)=>(
                                <div className="zero-sub-box2"><b>{idx+1}</b></div>
                            ))
                        }
                    </div>
                    <div className="zero-box zero-box2">
                        <div className="zero-sub-box1"><b> Description Of Goods</b></div>
                        {
                          bill.item && bill.item.map((val,idx)=>(
                                <div className="zero-sub-box2"><b>{val.description}</b></div>
                            ))
                        }
                    </div>
                    <div className="zero-box zero-box-similar">
                        <div className="zero-sub-box1"><b>HSN/SAC</b></div>
                        {
                          bill.item && bill.item.map((val,idx)=>(
                                <div className="zero-sub-box2">84663020</div>
                            ))
                        }
                    </div>
                    <div className="zero-box zero-box-similar">
                        <div className="zero-sub-box1"><b> Unit Rate</b></div>
                        {
                          bill.item && bill.item.map((val,idx)=>(
                                <div className="zero-sub-box2"><b>{val.unitRate}.00</b></div>
                            ))
                        }
                    </div>
                    <div className="zero-box zero-box-similar">
                        <div className="zero-sub-box1"><b>Qty</b></div>
                        {
                          bill.item && bill.item.map((val,idx)=>(
                                <div className="zero-sub-box2"><b>{val.quantity}.00</b></div>
                            ))
                        }
                    </div>
                    <div className="zero-box zero-box-box6">
                        <div className="zero-sub-box1"><b>UOM</b></div>
                        {
                         bill.item && bill.item.map((val,idx)=>(
                                <div className="zero-sub-box2">Nos.</div>
                            ))
                        }
                    </div>
                    <div className="zero-box zero-box-box7">
                        <div className="zero-sub-box1"><b> Applicable 
                            Taxes</b></div>
                            {
                          bill.item && bill.item.map((val,idx)=>(
                                <div className="zero-sub-box2">IGST 18%</div>
                            ))
                        }
                    </div>
                    <div className="zero-box zero-box-similar">
                        <div className="zero-sub-box1"><b> Disc %</b></div>
                        {
                          bill.item &&  bill.item.map((val,idx)=>(
                                <div className="zero-sub-box2" style={{marginTop:'5px'}}><b>{val.unitRate-val.totalAmount}</b><br></br>({val.discount}%)</div>
                            ))
                        }
                    </div>
                    <div className="zero-box zero-box9">
                        <div className="zero-sub-box1"> <b>Total Amount</b></div>
                        {
                          bill.item &&  bill.item.map((val,idx)=>(
                                <div className="zero-sub-box2" style={{marginTop:'5px'}}><b>{val.totalAmount}</b><br></br><i>IGST : 18%</i></div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="zero-fifth-vertical">
                <div className="zero-fifth-vertical-box1">
                    <div className="zero-fifth-thsub-box1-1"><b>Payment Terms : 30 #days from the date of Invoice</b></div>
                    <div className="zero-fifth-sub-box1-3"><b>Tax Value In Words :{" "}
                    {bill.taxamount ? numberToWords(Number(bill.taxamount)) : "N/A"}</b></div>
                    <div className="zero-fifth-sub-box1-2"><b> <u><i> Invoice Value In Words :{" "}
                        {bill.grandTotal ? numberToWords(Number(bill.grandTotal)) : "N/A"}
                        </i></u></b>
                    </div>
                </div>
                <div className="zero-fifth-vertical-box2">
                    <div className="zero-fifth-sub-box2">
                        <div className="zero-box1 zero-boxbg"> Basic Value</div>
                        <div className="zero-box2 zero-boxbg"><b>{bill.totalvalue}</b></div>
                    </div>
                    <div className="zero-fifth-sub-box2">
                        <div className="zero-box1"> Add CGST @ 9%</div>
                        <div className="zero-box2"> {bill.isOutside ?bill.taxamount/2 :0}.00</div>
                    </div>
                    <div className="zero-fifth-sub-box2">
                        <div className="zero-box1"> Add SGST @ 9%</div>
                        <div className="zero-box2"> {bill.isOutside ?bill.taxamount/2 :0}.00</div>
                    </div>
                    <div className="zero-fifth-sub-box2">
                        <div className="zero-box1"> Add IGST @ 18%</div>
                        <div className="zero-box2"> {bill.isOutside?"0.00":bill.taxamount}</div>
                    </div>
                    <div className="zero-fifth-sub-box2">
                        <div className="zero-box1"> Tax Amount</div>
                        <div className="zero-box2"> {bill.taxamount}</div>
                    </div>
                    <div className="zero-fifth-sub-box2">
                        <div className="zero-box1 zero-boxbg" style={{ borderBottom: "none" }}><b> GRAND TOTAL</b></div>
                        <div className="zero-box2 zero-boxbg" style={{ borderBottom: "none" }}><b><u>₹ {bill.grandTotal}</u></b></div>
                    </div>    
                </div>
            </div>
            <div className="zero-sixth-vertical">
                <div> <b>Mode Of Shipping : BY ROAD</b></div>
                <div> <b>L.R. / Docket No :</b></div>
            </div>
            <div className="zero-seventh-vertical">
                <div><b>Transport/ Courier Name :</b> TCI EXPRESS</div>
                <div> <b>Date & Time of Issue of Invoice :</b>{bill.invoicedate}    11.01 Am</div>
            </div>
            <div className="zero-eight-vertical">
                <div className="zero-eight-vertical-row1">
                    <div className="zero-box zero-box1"><b> Terms & Condition</b></div>
                    <div className="zero-box zero-box2"><b>Our Bank Details :</b></div>
                    <div className="zero-box zero-box3"><b>Sign.</b></div>
                    <div className="zero-box zero-box4"><b>For S S  FIXTURING</b></div>
                </div>
                <div className="zero-eight-vertical-row2">
                    <div className="zero-box zero-box1">
                        <div className="zero-sub-box">1</div>
                        <div className="zero-sub-box">2</div>
                        <div className="zero-sub-box">3</div>
                        <div className="zero-sub-box">4</div>
                        <div className="zero-sub-box">5</div>
                        <div className="zero-sub-box" style={{ borderBottom: "none" }}>6</div>
                    </div>
                    <div className="zero-box zero-box2">
                        <div className="zero-sub-box"> Reverse charge Liability, Amount of Tax Subjected to reverse Charge</div>
                        <div className="zero-sub-box">GST returns for ITC credit will be supplied only after receipt of full payment.</div>
                        <div className="zero-sub-box"> If payment of this bill is not received within due date, Matter may lead to legal action.</div>
                        <div className="zero-sub-box"> Shipping cost ( P & F) if not in Purchase order will be borne by Supplier. The Seller will not be responsible for any</div>
                        <div className="zero-sub-box">Rejection without mutual agreement of after 15 days of date of invoice will not be entertained.</div>
                        <div className="zero-sub-box" style={{ borderBottom: "none" }}>Subject to Pune Jurisdiction Only</div>
                    </div>
                    <div className="zero-box zero-box3">
                        <div className="zero-box3-text">
                            <b>
                                SS fixturing
                                Bank : PIMPRI CHINCHWAD SAHAKARI
                                    BANK MARYADIT, PIMPRI
                                    A/c No : 0040 0022 0000 2113<br />
                                    IFSC Code : IBKL0087PCS
                                </b>
                        </div>
                    </div>
                    <div className="zero-box zero-box4"> 
                        <div className="zero-box4-text">
                           
                            Receiver's Name & Sign & Seal<br />
                            <b>Name :</b>
                        </div>
                    </div>
                    <div className="zero-box zero-box5">
                    <img src={sign} alt='signatare'></img>
                    </div>
                </div>
            </div>
        </div>
            <TermsandCon/>
        </div>
    </div>
        <button onClick={downloadPDF} className='pdf-download-btn'> Download PDF<i className="fa-solid fa-download"></i></button>
       </>
  );
}
