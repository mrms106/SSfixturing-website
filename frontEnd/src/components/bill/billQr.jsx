import QRCode from 'qrcode.react'; 
import html2canvas from 'html2canvas';
import { useRef } from 'react';

export default function billQr({pdf,showqr,setshowqr}){
    const qrCodeRef = useRef();
    const downloadQRCode = () => {
        html2canvas(qrCodeRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `qrcode-${pdf.serialNO}.png`; // Set the file name
            link.click();
        });
    };
    return(
        <>
           <div className="cardimage">
                        <div id={`qr-container-${pdf.serialNO}`} className= {showqr[pdf.serialNO] ?"qr-container": "Qrhidden" } 
                        >
                            <div ref={qrCodeRef}>
                            <QRCode
                            
                                id={`qr-code-${pdf.serialNO}`}
                                value={`https://ssfixturing.com/api/pdf/${pdf.serialNO}`}
                                className="qr-code"
                                size={220} // Adjust size as needed
                                level="H"  // Error correction level (L, M, Q, H)
                                includeMargin={true} // Include margin around the QR code
                            /></div>
                           
                                <button onClick={downloadQRCode}>Download QR</button>     
                            <hr />
                        </div>
            </div>
        </>
    )
}