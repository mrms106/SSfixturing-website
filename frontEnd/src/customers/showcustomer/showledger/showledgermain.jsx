import { useEffect } from "react"
import './showledger.css'

export default function Showledger({bills,fetchBill}){
   const logo='https://ssfixturing.com/sslogo.png'
    return(
        <>
        <div className="show-ledger">
            <div className="show-ledger-main">
                <div className="ledger-horizontal-one">OUTSTANDING PAYMENT DUE RECEIPT <img src={logo} alt="ssfixturing-logo"/></div>
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
                        <div className="ledger-horizontal-two-three-one ledger-horizontal-two-similar-one">Contact Per. Name:</div>
                        <div className="ledger-horizontal-two-three-two ledger-horizontal-two-similar-two">Mr. Shubham Shinde</div>
                    </div>
                    <div className="ledger-horizontal-two-four">
                        <div className="ledger-horizontal-two-four-one ledger-horizontal-two-similar-one">Contact No./ Mail Id. :</div>
                        <div className="ledger-horizontal-two-four-two ledger-horizontal-two-similar-two">960-423-3567 / 928-455-0570 / ssfixturing1@gmail.com</div>
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
                   bills && bills.map((bill,idx)=>(
                    <div className="ledger-horizontal-three-two">
                        <div className="ledger-horizontal-three-two-one">{idx+1}</div>
                        <div className="ledger-horizontal-three-two-two">{bill.invoicedate}</div>
                        <div className="ledger-horizontal-three-two-three">{bill.cname}</div>
                        <div className="ledger-horizontal-three-two-four"> {bill.grandTotal}</div>
                        <div className="ledger-horizontal-three-two-five">0</div>
                        <div className="ledger-horizontal-three-two-six">{bill.grandTotal}</div>
                        <div className="ledger-horizontal-three-two-seven">{bill.creditedAmount}a</div>
                        <div className="ledger-horizontal-three-two-eight"> Cr.</div>
                        <div className="ledger-horizontal-three-two-nine">{bill.grandTotal-bill.creditedAmount}</div>
                    </div>
                    ))
                    }
                     <div className="ledger-horizontal-three-three">
                        <div className="ledger-horizontal-three-three-one">Sub Total Amount</div>
                        <div className="ledger-horizontal-three-three-two"></div>
                        <div className="ledger-horizontal-three-three-three"></div>
                        <div className="ledger-horizontal-three-three-four"> 0.00</div>
                        <div className="ledger-horizontal-three-three-five"></div>
                        <div className="ledger-horizontal-three-three-six"></div>
                        <div className="ledger-horizontal-three-three-seven">611148.8</div>
                        <div className="ledger-horizontal-three-three-eight"></div>
                        <div className="ledger-horizontal-three-three-nine">296101 .96 RS</div>
                    </div>
                </div>
                <div className="ledger-horizontal-four">
                    Make your component, Next level…
                </div>
            </div>
        </div>
        </>
    )
}