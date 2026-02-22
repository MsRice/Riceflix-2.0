import { useEffect, useMemo, useState } from "react";
import { useMovie } from "../../contexts/movie/MovieContext";
import { useLanguage } from "../../contexts/lang/LanguageContext";
import type { ContentDetails } from "../../utils/types";

const BrowserBanner = () => {

    const { categoriesList , getContentDetails } = useMovie()
    const { language } = useLanguage()
    const[ bannerDetails , setBannerDetails ] = useState<Promise<ContentDetails | null>>()

    function hashStringToIndex(str: string, mod: number) {
        let h = 0;
        for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
        return mod ? h % mod : 0;
    }

    const results = categoriesList?.trendingAll?.results;

    const randomMovie = useMemo(() => {
        if (!results?.length) return null;

        const dayKey = new Date().toISOString().slice(0, 10);
        const index = hashStringToIndex(dayKey, results.length);

        
        return results[index];
    }, [results]);

    useEffect(() => {
        if (!randomMovie) return;


        const fetchDetails = async () => {
            const contentDetails =getContentDetails(
                randomMovie.id,
                randomMovie.media_type,
                language === "en" ? "en-US" : "es-ES"
            );

            if(contentDetails){
                setBannerDetails(contentDetails)
            }
        }
        fetchDetails()
    
    }, [randomMovie, language , getContentDetails]);


    console.log(randomMovie)
    console.log(bannerDetails)

    return (
        <div>
            Browser banner
        </div>
    );
}

export default BrowserBanner;
