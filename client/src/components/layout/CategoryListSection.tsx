import { useRef } from "react";
import type { CategoryListSectionProps } from "../../utils/types";
import SectionTitle from "../ui/SectionTitle";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import CategoryListCard from "./CategoryListCard";

const CategoryListSection = ({children , sectionResults}:CategoryListSectionProps) => {
    
    const rowRef = useRef<HTMLDivElement|null>(null)


    const scrollLeft = (direction: "left" | "right") => {
        if(!rowRef.current) return

        const row = rowRef.current
        const {scrollLeft , scrollWidth , clientWidth} = row
        const scrollAmount = clientWidth

        if(direction === "right"){
            if( scrollLeft + clientWidth >= scrollWidth -5){
                row.scrollTo({ left:0, behavior: "smooth"})
            } else {
                row.scrollBy({left: scrollAmount, behavior:"smooth"})
            }
        }

        if(direction ==="left"){
            if(scrollLeft <= 5){
                row.scrollTo({
                    left: scrollWidth - clientWidth,
                    behavior:"smooth"
                })
            }else{
                row.scrollBy({left: -scrollAmount, behavior:"smooth"})
            }
        }

    }

    return (
        <div className="category__container--wrapper">
            <SectionTitle className="secondary-title">{children}</SectionTitle>
            <div className="category__row--wrapper">
                <button className="arrow-btn-left" onClick={() => scrollLeft('left')}>
                    <MdKeyboardArrowLeft />
                </button>
                <div ref={rowRef} className="category__items--wrapper">
                    {sectionResults?.map(item => (
                        
                        <CategoryListCard key={item.raw_tmdb.id} item={item}/>
                        
                    ))}
                </div>
                <button className="arrow-btn-right" onClick={() => scrollLeft('right')}>
                    <MdKeyboardArrowRight />
                </button>
            </div>
        </div>
    );
}

export default CategoryListSection;
