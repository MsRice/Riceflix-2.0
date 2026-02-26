import { useRef } from "react";
import type { CategorySectionProps } from "../../utils/types";
import SectionTitle from "../ui/SectionTitle";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import CategoryCard from "./CategoryCard";

const CategorySection = ({children , sectionResults}:CategorySectionProps) => {
    console.log(sectionResults)
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
                <button className="arrow-btn" onClick={() => scrollLeft('left')}>
                    <MdKeyboardArrowLeft />
                </button>
                <div ref={rowRef} className="category__items--wrapper">
                    {sectionResults?.results.map(item => (
                        
                        <CategoryCard key={item.id} item={item}/>
                        
                    ))}
                </div>
                <button className="arrow-btn" onClick={() => scrollLeft('right')}>
                    <MdKeyboardArrowRight />
                </button>
            </div>
        </div>
    );
}

export default CategorySection;
