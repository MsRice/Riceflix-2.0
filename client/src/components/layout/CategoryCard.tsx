import type { CategoryMovie } from "../../utils/types";

const CategoryCard = ({item}:{item: CategoryMovie}) => {
    return (
        <div className="category__item--wrapper" >
            {item.backdrop_path && 
            <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} className="category__cardImage--image" alt="" />}
            
        </div>
    );
}

export default CategoryCard;
