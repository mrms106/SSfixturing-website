import { useState,useEffect } from 'react';

import '../css/bill.css'
import Swal from 'sweetalert2';
import UploadBill from './uploadBill';
import BillQr from './billQr';
import BillButtons from './billButtons';
import HomeHead from '../homehead';

export default  function billMain({currentUser}){

    if(currentUser?.username!=="ShubhamShinde"){
        return (
            <div className="upload">
                <p style={{color:"white"}}>page is not available</p>
            </div>
        )
    }

    const [pdfs, setPdfs] = useState([]);
    const [fetchdata,setfetchdat]=useState(false)
    const [showqr,setshowqr]=useState({})
    const [search,setsearch]=useState("")
    const [visibleCount, setVisibleCount] = useState(4);

    const fetchPdfs = async () => {
        try {
            const response = await fetch('https://ssfixturing.com/api/upload',{
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
        setshowqr(prevState=>({
            ...prevState,[serialNO]: !prevState[serialNO]
        }))
    };
    const bill=pdfs.filter((pdf)=>
        pdf.name.toLowerCase().includes(search.toLowerCase())
)
const showMoreItems = () => {
    setVisibleCount(bill.length);
};
console.log(search)
    return(
        <>
         <HomeHead
          title=" SS Fixturing"
          description="This page is Not available"
        />
           <div className="upload">
              <UploadBill fetchdata={fetchdata} setfetchdata={setfetchdat}/>
                <div className="serchClass"> 
                    <input 
                        className='BillSearch'
                        type='search' 
                        name='search' 
                        onChange={(e) => setsearch(e.target.value)}
                        placeholder='Search Bill By name'>
                    </input>
                    <h1>Our Bills</h1>
                </div>
                <div className="pdfcards">
                    {bill.slice(0,visibleCount).map(pdf => (
                        <div className="maincard" key={pdf.serialNO}>
                            <BillQr showqr={showqr} setshowqr={setshowqr} pdf={pdf} />
                            <div className="cardcontent">
                                <a href={`https://ssfixturing.com/api/pdf/${pdf.serialNO}`}>{pdf.name}</a>
                                <hr />
                                <BillButtons showqr={showqr} setshowqr={setshowqr} toggleQRCode={toggleQRCode} pdf={pdf} setPdfs={setPdfs} pdfs={pdfs}/>
                            </div>
                        </div>
                    ))}
                 </div>
                 {
                    bill.length<1 ? <p style={{color:"white"}}>there is no bill by this name search correctlly</p>: ""
                 }
                 {bill.length > visibleCount && (
                <button className='showMoreBtn' onClick={showMoreItems}>Show More Bills</button>
            )}
            </div>
        </>
    )
}