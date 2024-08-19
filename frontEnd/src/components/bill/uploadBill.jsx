import { useState } from "react";
import Swal from 'sweetalert2';

export default function uploadBill({fetchdata,setfetchdata}){

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!file) {
        Swal.fire({
          icon: 'warning',
          title: 'No file selected',
          text: 'Please select a PDF file to upload.',
        });
        return;
      }
  
      const formData = new FormData();
      formData.append('pdf', file);
  
      try {
        const response = await fetch('https://ssfixturing.com/api/upload', {
          method: 'POST',
          body: formData,
          credentials:'include'
        });
  
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'File Uploaded',
            text: 'Your PDF file has been uploaded successfully.',
          });
          setfetchdata(true)
          setFile(null); 
          e.target.reset();
        } else {
          throw new Error('Failed to upload the file.');
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'There was an error uploading the file. Please try again later.',
        });
      }finally{
        setTimeout(()=>{
            setfetchdata(false)

        },10)
       
      }
    };
    return(
        <>
           <h1>Upload Bill</h1>
            <a className="logout" href="/logout"><b>Log-Out</b></a>
            <form id='billForm' className='billForm'  encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="file-upload">
                    <label>Choose File</label>
                    <input type="file" name="pdf" accept=".pdf" onChange={handleFileChange} />
                </div>
                <button>Upload</button>
            </form>
        </>
    )
}