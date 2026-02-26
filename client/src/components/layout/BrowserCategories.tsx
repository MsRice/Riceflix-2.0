import { useMovie } from "../../contexts/movie/MovieContext";
import CategorySection from "./CategorySection";

const BrowserCategories = () => {

     const { categoriesList } = useMovie()



    console.log(categoriesList)
    return (
        <div className="categories-section__container--wrapper">
            
            <CategorySection sectionResults={categoriesList?.trendingAll}>Trending All</CategorySection>
            <CategorySection sectionResults={categoriesList?.actionMovies}>Action Movies</CategorySection>
            <CategorySection sectionResults={categoriesList?.comdeyMovies}>Comedy Movies</CategorySection>
            <CategorySection sectionResults={categoriesList?.trendingTV}>Trending Tv</CategorySection>

            
        </div>
    );
}

export default BrowserCategories;
