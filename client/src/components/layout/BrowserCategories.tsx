import { useTranslation } from "react-i18next";
import { useMovie } from "../../contexts/movie/MovieContext";
import CategorySection from "./CategorySection";
import { useEffect } from "react";
// import { useAuthentication } from "../../contexts/auth/AuthenticationContext";

const BrowserCategories = () => {

     const { categoriesList , userList } = useMovie()
    //  const { activeProfile } = useAuthentication()
     const { t } = useTranslation()

    useEffect(() => {
    console.log("userList updated:", userList)
    }, [userList])
    return (
        <div className="categories-section__container--wrapper">

            
            {/* <CategorySection sectionResults={userList?.favorites ?? []}>{t("category_section_favorites")}</CategorySection>
            <CategorySection sectionResults={userList?.watchlist ?? []}>{t("category_section_watchlist")}</CategorySection>
            <CategorySection sectionResults={userList?.history ?? []}>{t("category_section_history")}</CategorySection> */}
            
            <CategorySection sectionResults={categoriesList?.trendingAll}>{t("category_section_trending_all")}</CategorySection>
            <CategorySection sectionResults={categoriesList?.actionMovies}>{t("category_section_action_movies")}</CategorySection>
            <CategorySection sectionResults={categoriesList?.comdeyMovies}>{t("category_section_comedy_movies")}</CategorySection>
            <CategorySection sectionResults={categoriesList?.trendingTV}>{t("category_section_trending_tv")}</CategorySection>

            
        </div>
    );
}



export default BrowserCategories;
