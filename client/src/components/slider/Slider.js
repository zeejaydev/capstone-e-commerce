import Slide1 from "../../assets/images/slide1.jpg";
import Slide2 from "../../assets/images/slide2.jpg";
import "./Slider.css"
import { BsChevronCompactRight } from "react-icons/bs";
import { BsChevronCompactLeft } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";

const slides = [
    {
        image: Slide1,
        season: 'Summer 2022',
        title: 'new collection',
        desc: 'We know how large objects will act, but things on a small scale.'
    },
    {
        image: Slide2,
        season: 'winter 2022',
        title: 'new collection',
        desc: 'We know how large objects will act, but things on a small scale.'
    }
]
const Slider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mouseOver, setMouseOver] = useState(false);
    const autoPlayRef = useRef(null)

    useEffect(() => {
        autoPlayRef.current = handleNextSlide
    })

    useEffect(() => {
        if(mouseOver)return;
        const play = () => {
            autoPlayRef.current()
        }
        const interval = setInterval(play, 4000)
        return () => clearInterval(interval)
    }, [mouseOver])

    const handleNextSlide = (i) => {
       
        if (activeIndex === slides.length - 1) {
            setActiveIndex(0)
        } else {
            setActiveIndex(activeIndex + 1)
        }
    }
    const handlePrevSlide = (i) => {
        if (i === 0) {
            setActiveIndex(slides.length - 1)
        } else {
            setActiveIndex(activeIndex - 1)
        }
    }

    return (
        <>
            <div className="slides-container">
                <div className="slide-image-container" onMouseOver={()=>setMouseOver(!mouseOver)} onMouseLeave={()=>setMouseOver(!mouseOver)}>
                    {slides.map((slide, i) => {
                        return (
                            <div key={i} className={i === activeIndex ? "active" : "inactive"}>
                                <img src={slide.image} alt="" className="slide-image" />
                                <div className="slides-arrows-container">
                                    <BsChevronCompactLeft size={24} color='white' onClick={() => handlePrevSlide(i)} />
                                    <div className="text">
                                        <span>{slide.season}</span>
                                        <h1>{slide.title}</h1>
                                        <p>{slide.desc}</p>
                                    </div>
                                    <BsChevronCompactRight size={24} color='white' onClick={() => handleNextSlide(i)} />
                                </div>
                            </div>
                        )
                    })}
                    <div className="slides-indecator-container">
                        {slides.map((slide, i) => (
                            <div key={i} className={i === activeIndex ? "active-indecator" : "inactive-indecator"}></div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Slider;
