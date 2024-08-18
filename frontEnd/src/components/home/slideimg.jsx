import { useState,useEffect } from 'react'
import '../css/slideimg.css'
import slide1 from '../images/home/hydralics/slide1.png'
import slide2 from '../images/home/hydralics/slide2.png'
import slide3 from '../images/home/hydralics/slide4.png'
import slide4 from '../images/home/hydralics/slide5.png'
import mobileslide1 from '../images/home/hydralics/hydraulic.jpg'
import mobileslide2 from '../images/home/hydralics/hydraulic2.jpg'
import mobileslide3 from '../images/home/hydralics/powerpack.jpg'
import mobileslide4 from '../images/home/hydralics/welding.jpg'


export default function slideImage(){
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0)

    const updateImagesBasedOnWidth = () => {
        if (window.innerWidth < 760) {
            setImages([mobileslide1, mobileslide2, mobileslide3, mobileslide4]);
        } else {
            setImages([slide1, slide2, slide3, slide4]);
        }
    };

    useEffect(() => {
        updateImagesBasedOnWidth(); // Initial check
        window.addEventListener('resize', updateImagesBasedOnWidth);
        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', updateImagesBasedOnWidth);
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);
    return(
        <div className='mainSlideimg'>
            <button className='left-btn' onClick={handlePrev}>❮</button>
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
            <button className='right-btn' onClick={handleNext}>❯</button>
        </div>
    )
}