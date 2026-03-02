import { useEffect, useMemo, useState } from "react";
import { useMovie } from "../../contexts/movie/MovieContext";
import { useLanguage } from "../../contexts/lang/LanguageContext";
import type { ContentDetails } from "../../utils/types";
import YouTube from "react-youtube";
import ButtonMain from "../ui/ButtonMain";
import { FaPlay } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";
import { useTranslation } from "react-i18next";


const BrowserBanner = () => {
    const { t } = useTranslation()
    const { categoriesList , getContentDetails } = useMovie()
    const { language } = useLanguage()
    const[ bannerDetails , setBannerDetails ] = useState<ContentDetails | null>()
    const [videoEnded, setVideoEnded] =useState(false)

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
            const contentDetails = await getContentDetails(
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

    const trailer = bannerDetails?.raw_tmdb?.videos?.results
                ?.find(
                (el) =>
                    ["Official Trailer", "Official Teaser"].some((keyword) =>
                 el.name?.includes(keyword)
                ))
    // console.log(randomMovie)
    // console.log(bannerDetails)

    return (
        <div className="browser-banner__container--wrapper">

        {!videoEnded ? <>
            { trailer &&
                
                <div key={trailer.id} className="browser-banner--wrapper">
                    <figure className='browser-banner__frame--wrapper'>

                        <YouTube 
                            videoId={trailer.key}
                            className='browser-banner__frame'
                            title="Trailer"
                            
                            opts={{
                                width: "100%",
                                height: "100%",
                                playerVars: {
                                    autoplay: 1,
                                    mute:1,
                                    controls: 0,
                                    fullscreen: 1,
                                    origin: window.location.origin,
                                }
                            }}
                            onEnd={() => setVideoEnded(true)}/>
                            
                    </figure>
                            
                </div>
                            
            }
                       
        </> : <>
        <div className="browser-banner--wrapper">
            
            <img className='browser-banner__image' src={`https://image.tmdb.org/t/p/original/${bannerDetails?.raw_tmdb?.backdrop_path}`} alt="" />
        </div>
            
        </>} 
        <div className="browser-banner__info--container">
            <div className="browser-banner__info--wrapper">
                <h1 className="browser-banner--title">{bannerDetails?.title}</h1>
                <p className="browser-banner--description">{bannerDetails?.description}</p>
                <div className="banner__buttons">
                    <ButtonMain className="play-btn"><FaPlay className="button-svg"/>{t("play")}</ButtonMain>
                    <ButtonMain className="info-btn"><CiCircleInfo className="button-svg"/>{t("more_info")}</ButtonMain>
                </div>
            </div>
        </div>
        </div>
    );
}

export default BrowserBanner;
