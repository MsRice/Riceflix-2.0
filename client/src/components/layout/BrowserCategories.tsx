import { useTranslation } from "react-i18next";
import { useMovie } from "../../contexts/movie/MovieContext";
import CategorySection from "./CategorySection";

const BrowserCategories = () => {

     const { categoriesList } = useMovie()
     const { t } =useTranslation()

    return (
        <div className="categories-section__container--wrapper">
            
            <CategorySection sectionResults={categoriesList?.trendingAll}>{t("category_section_trending_all")}</CategorySection>
            <CategorySection sectionResults={categoriesList?.actionMovies}>{t("category_section_action_movies")}</CategorySection>
            <CategorySection sectionResults={categoriesList?.comdeyMovies}>{t("category_section_comedy_movies")}</CategorySection>
            <CategorySection sectionResults={categoriesList?.trendingTV}>{t("category_section_trending_tv")}</CategorySection>

            
        </div>
    );
}

export default BrowserCategories;
