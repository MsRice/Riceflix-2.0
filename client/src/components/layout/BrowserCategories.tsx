import { useTranslation } from "react-i18next";
import { useMovie } from "../../contexts/movie/MovieContext";
import CategorySection from "./CategorySection";
import { useEffect } from "react";
import { useAuthentication } from "../../contexts/auth/AuthenticationContext";
import CategoryListSection from "./CategoryListSection";


const BrowserCategories = () => {

     const { categoriesList } = useMovie()
     const { userList } = useAuthentication()
     const { t } = useTranslation()

     const favorites = userList?.favorites ?? [];
     const watchlist = userList?.watchlist ?? [];
     const history = userList?.history ?? [];

    useEffect(() => {
    // console.log("userList updated:", userList)
    }, [userList])
    return (
        <div className="categories-section__container--wrapper">


            {favorites.length > 0 && (<CategoryListSection sectionResults={userList?.favorites}>{t("category_section_favorites")}</CategoryListSection>)}
            {watchlist.length > 0 && (<CategoryListSection sectionResults={userList?.watchlist}>{t("category_section_watchlist")}</CategoryListSection>)}
            {history.length > 0 && (<CategoryListSection sectionResults={userList?.history}>{t("category_section_history")}</CategoryListSection>)}
            
             
            
            <CategorySection sectionResults={categoriesList?.trendingAll}>{t("category_section_trending_all")}</CategorySection>
            <CategorySection sectionResults={categoriesList?.actionMovies}>{t("category_section_action_movies")}</CategorySection>
            <CategorySection sectionResults={categoriesList?.comdeyMovies}>{t("category_section_comedy_movies")}</CategorySection>
            <CategorySection sectionResults={categoriesList?.trendingTV}>{t("category_section_trending_tv")}</CategorySection>

            
        </div>
    );
}



export default BrowserCategories;
