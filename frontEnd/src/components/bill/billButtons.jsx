
import DeleteButton from './deleteButton'
export default function billButtons({pdfs,pdf,setPdfs,toggleQRCode,showqr,setshowqr}){

   

    const handleDelete = async (serialNO) => {
        try {
            const response = await fetch(`https://ssfixturing.com/api/pdf/${serialNO}`, {
                method: 'DELETE',
                credentials:'include'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setPdfs(pdfs.filter(pdf => pdf.serialNO !== serialNO));
        } catch (error) {
            console.error('Error deleting PDF:', error);
        }
    };
    return(
        <>
           <div className="buttons">
                            <button
                                id={`qr-btn-${pdf.serialNO}`}
                                onClick={() => toggleQRCode(pdf.serialNO)}
                            >
                              {showqr[pdf.serialNO] ? "Hide Qr" : "generate Qr"} 
                            </button>
                            {/* <button
                                className="delete-btn"
                                onClick={() => handleDelete(pdf.serialNO)}
                            >
                                Delete Bill
                            </button> */}
                            <DeleteButton pdf={pdf} handleDelete={handleDelete}/>
                        </div>
        </>
    )
}