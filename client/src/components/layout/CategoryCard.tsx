import type { CategoryMovie, ContentDetails, MetaCategoryData } from "../../utils/types";
import { IoPlay } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineThumbUp } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useMovie } from "../../contexts/movie/MovieContext";
import { useState } from "react";
import { useLanguage } from "../../contexts/lang/LanguageContext";


const CategoryCard = ({item}:{item: CategoryMovie}) => {
    const { getContentDetails } = useMovie()
    const [indexDetailed , setIndexDetailed] = useState<MetaCategoryData | null>(null)
    const { language } = useLanguage()

    const fetchDetails = async () => {
        console.log('nt+lb' , item)
        if (indexDetailed) return;
            const contentDetails = await getContentDetails(
                item.id,
                item.media_type ?? "movie",
                language === "en" ? "en-US" : "es-ES"
            );
            // console.log("nt" ,indexDetailed)

            if (!contentDetails) return; 

            const meta = metaCategoryData(contentDetails)
            setIndexDetailed(meta)
    }

        function metaCategoryData( contentDetails : ContentDetails ): MetaCategoryData {
            if(contentDetails.type === "movie"){
                const runtime = contentDetails.raw_tmdb.runtime ?? 0;

                const hours = Math.floor(runtime / 60);
                const mins = runtime % 60;

                const formattedRuntime =
                    hours > 0 && mins > 0
                    ? `${hours}h ${mins}m`
                    : hours > 0
                    ? `${hours}h`
                    : `${mins}m`;

                return {
                    type:"movie",
                    trailer: contentDetails.raw_tmdb.videos?.results.find( (el) =>
                        ["Official Trailer", "Official Teaser"].some((keyword) =>
                        el.name?.includes(keyword)
                        )),
                    runtime:  formattedRuntime,
                    production_co: contentDetails.raw_tmdb.production_companies[0] ?? null,
                    genres: contentDetails.raw_tmdb.genres

        
                }
            }
        
            
            const seasons = contentDetails.raw_tmdb.number_of_seasons ?? 0;
            return {
                type: "tv",
                trailer: contentDetails?.raw_tmdb.videos?.results.find((el) =>
                    ["Trailer", "Teaser"].some((keyword) =>
                    el.name?.includes(keyword)
                    )),
                season_ct:  `${seasons} Season${seasons > 1 ? "s" : ""}`,
                production_co: contentDetails   .raw_tmdb.production_companies[0] ?? 0 ,
                genres: contentDetails.raw_tmdb.genres

            }
        }

    
    return (
        
        <div className="category__item--wrapper" onMouseEnter={() => fetchDetails()}>
            <div className="category__image--wrapper" >
                {item.backdrop_path && 
                <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} className="category__cardImage--image" alt="" />}
            </div>
            <div className="category__details--wrapper">
              <div>
                <div><IoPlay />|<FaPlus />| <HiOutlineThumbUp /></div>
                <div><MdOutlineKeyboardArrowDown /></div>
              </div>
              <div>runtime/season | production company?</div>
              <div>tags/genre</div>
            </div>

        </div>

        
    );
}

export default CategoryCard;
