import { useEffect, useRef, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import { useMovie } from "../../contexts/movie/MovieContext";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import type { CategoryMovie } from "../../utils/types";
import TrendingCard from "../ui/TrendingCard";
import { useTranslation } from "react-i18next";


const LandingTrending = () => {
    const rowRef = useRef<HTMLDivElement|null>(null)
    const { categoriesList } = useMovie()

    const topTen:CategoryMovie[] = categoriesList?.trendingAll?.results?.slice(0,10) ?? []
    const [isStart , setIsStart] = useState(true)
    const [isEnd , setIsEnd] = useState(false)
    const {t} = useTranslation()

    const scrollLeft = (direction: "left" | "right") => {
        if(!rowRef.current) return

        const {offsetWidth} = rowRef.current
        rowRef.current.scrollBy({
            left: direction === 'left' ? -offsetWidth : offsetWidth,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        const row = rowRef.current;
        if (!row) return;

       
        const updateScrollState = () => {
            if (!rowRef.current) return;
    
            const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    
            setIsStart(scrollLeft <= 5);
            setIsEnd(scrollLeft + clientWidth >= scrollWidth - 5);
        };

        row.addEventListener("scroll", updateScrollState);

        return () => {
            row.removeEventListener("scroll", updateScrollState);
        };
        }, []);

    return (
        <div className="landing__trending--container">
            <div className="landing__trending--wrapper">
                <SectionTitle className="primary-title">{t('trending')}</SectionTitle>
                <div className="trending__ten--wrapper">
                    <button className="arrow-btn" disabled={isStart} onClick={() => scrollLeft('left')}>
                        <MdKeyboardArrowLeft />
                    </button>
                    <div className="trending__ten--row" ref={rowRef}>
                        {topTen.map((movie: CategoryMovie , index) =>(
                            <TrendingCard index={index} movie={movie}/>
                        ))}
                    </div>
                    <button className="arrow-btn" disabled={isEnd} onClick={() => scrollLeft('right')}>
                        <MdKeyboardArrowRight />
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default LandingTrending;
