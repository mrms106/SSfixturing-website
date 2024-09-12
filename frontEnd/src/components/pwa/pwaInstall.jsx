import { useEffect, useState } from "react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
export default function PwaInstall({deferredPrompt,setDeferredPrompt}) {
    const [showInstallButton, setShowInstallButton] = useState(true);


setTimeout(()=>{
    setShowInstallButton(false)
},10000)
    const handleInstallClick = () => {
        
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show the install prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null); 
                setShowInstallButton(false); 
            });
        }
    };
    const buttonStyle = {
        width: '130px',
        height: '40px',
        fontSize: '16px',
        padding: '8px 5px 0px 14px',
        border: '1px solid white',
        borderRadius: '10px',
        backgroundColor: '#19171A',
        color: 'white',
        cursor: 'pointer',
        fontFamily: "'Rambla', sans-serif",
        position: 'fixed', 
        bottom: 20,
         right: 20,
         zIndex:1000,
         display:'flex'
      };
    return (
        <>
            {showInstallButton && (
                <button 
                
                    onClick={handleInstallClick} 
                    style={buttonStyle}>
                    <span>Install App</span><FileDownloadIcon/>
                </button>
            )}
        </>
    );
}
