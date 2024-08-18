import QRCode from 'qrcode.react'; 

export default function billQr({pdf,showqr,setshowqr}){
    return(
        <>
           <div className="cardimage">
                        <div id={`qr-container-${pdf.serialNO}`} className= "qr-container Qrhidden"
                        >
                            <QRCode
                                id={`qr-code-${pdf.serialNO}`}
                                value={`http://localhost:8080/pdf/${pdf.serialNO}`}
                                className="qr-code"
                            />
                            <a
                                id={`download-link-${pdf.serialNO}`}
                                className="download-btn"
                                href={`/api/qrcode/${pdf.serialNO}`} // Endpoint to generate/download QR code
                                download={`qrcode-${pdf.name}.png`}
                            >
                                <button>Download QR</button>
                            </a>
                            <hr />
                        </div>
            </div>
        </>
    )
}