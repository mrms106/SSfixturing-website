import { useState,useEffect } from 'react';

import '../css/bill.css'
import Swal from 'sweetalert2';
import UploadBill from './uploadBill';
import BillQr from './billQr';
import BillButtons from './billButtons';

export default function billMain(){

    const [pdfs, setPdfs] = useState([]);
    const [fetchdata,setfetchdat]=useState(false)
    const [showqr,setshowqr]=useState(false)

    const fetchPdfs = async () => {
        try {
            const response = await fetch('http://localhost:8080/upload',{
                credentials:'include',
                method:'GET'
            }); 
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setPdfs(data);
        } catch (error) {
            console.error('Error fetching PDFs:', error);
        }
    };

   useEffect(() => {
       
        fetchPdfs();
        console.log(fetchdata)
        let intervalId;
        if (fetchdata) {
            intervalId = setInterval(fetchPdfs, 1000); 
        }

        return () => clearInterval(intervalId);
    }, [fetchdata]);

    const toggleQRCode = (serialNO) => {
        const qrContainer = document.getElementById(`qr-container-${serialNO}`);
        qrContainer.classList.toggle('Qrhidden'); // Toggle QR code visibility
        setshowqr(!showqr)
    };

    
    return(
        <>
           <div className="upload">
              <UploadBill fetchdata={fetchdata} setfetchdata={setfetchdat}/>
                <div className="pdfcards">
                    {pdfs.map(pdf => (
                        <div className="maincard" key={pdf.serialNO}>
                            <BillQr showqr={showqr} setshowqr={setshowqr} pdf={pdf} />
                            <div className="cardcontent">
                                <a href={`http://localhost:8080/pdf/${pdf.serialNO}`}>{pdf.name}</a>
                                <hr />
                                <BillButtons showqr={showqr} setshowqr={setshowqr} toggleQRCode={toggleQRCode} pdf={pdf} setPdfs={setPdfs} pdfs={pdfs}/>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </>
    )
}