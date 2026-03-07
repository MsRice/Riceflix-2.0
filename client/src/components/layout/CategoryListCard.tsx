import type { ContentDetails, MetaCategoryData, ProfileListTypes } from "../../utils/types";
import { IoPlay } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineThumbUp } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
// import { useLanguage } from "../../contexts/lang/LanguageContext";
import { useAuthentication } from "../../contexts/auth/AuthenticationContext";
import {  useLocation , useNavigate } from "react-router-dom";


const CategoryListCard = ({item}:{item: ContentDetails}) => {
    const { activeProfile , updateProfileList } = useAuthentication()
    const [indexDetailed , setIndexDetailed] = useState<MetaCategoryData | null>(null)
    // const { language } = useLanguage()
    const navigate = useNavigate()
    const location = useLocation()


    const fetchDetails = async () => {
        if (indexDetailed) return;
       
        const meta = metaCategoryData(item)
            
        setIndexDetailed(meta)
    }

    function handlePlay(contentId:number ,listName:ProfileListTypes, type: "movie" | "tv"   ){
      
        handleListUpdate(contentId ,listName , type)
        navigate(`/watch/${contentId}/${type}`)
        
    }

    function handleListUpdate(contentId:number ,listName:ProfileListTypes , type: "movie" | "tv" ){
        

     
        const profileId = activeProfile?._id || 'null'

        updateProfileList({profileId, contentId , listName , type})


    }
    
    function handleBrowseDetails(contentId:number , type: "movie" | "tv" | undefined ){

        navigate(`/browse/${contentId}/${type}` , {
            state: {backgroundLocation: location}
        })

    }

    function metaCategoryData( contentDetails : ContentDetails ): MetaCategoryData {
        if(contentDetails.type === "tv"){
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

    
    return (
        
        <div className="category__item--wrapper" onMouseEnter={() => fetchDetails()}>
            <div>
                {item.raw_tmdb.backdrop_path && 
                <div className="category__image--wrapper" >
                    <img src={`https://image.tmdb.org/t/p/w500${item.raw_tmdb.backdrop_path}`} className="category__cardImage--image" alt="" />
                    <p className="category__card-title">{item.type === 'movie' && item.title}</p>
                </div>
                }
            </div>
            
            {indexDetailed &&
            <div className="category__details--wrapper">
                
                <div className="details__btns--wrapper">
                    <div className="btns--wrapper">
                        <div className="detail-btn play" onClick={() => handlePlay(item.raw_tmdb.id ,"history" , item.type)}><IoPlay  /></div>
                        <div className="detail-btn" onClick={() => handleListUpdate(item.raw_tmdb.id ,"watchlist" , item.type)}><FaPlus /></div>
                        <div className="detail-btn" onClick={() => handleListUpdate(item.raw_tmdb.id ,"favorites" , item.type)}><HiOutlineThumbUp  /></div>
                    </div>
                    <div>
                        <div className="detail-btn" onClick={() => handleBrowseDetails(item.raw_tmdb.id , item.type)}><MdOutlineKeyboardArrowDown  /></div>
                    </div>
                </div>

                {/* movie */}
                {indexDetailed.type === "movie" && <> 
                <div>{`${indexDetailed.runtime}`} | {`${indexDetailed.production_co?.name}`} </div>
                <div className="details__genres--wrapper">

                    {indexDetailed.genres.slice(0,3).map(
                        (genre , index) => (
                            <span key={genre.id}>
                                {`${genre.name}`}
                                {index !== indexDetailed.genres.length - 1 && ", "}
                            </span>
                        )
                    )}
                </div>
                </>
                }

                {/* tv */}
                {indexDetailed.type === "tv" && <> 
                <div>{`${indexDetailed.season_ct}`} | {`${indexDetailed.production_co?.name}`} </div>
                <div className="details__genres--wrapper">
                
                {indexDetailed.genres.slice(0,3).map(
                    (genre , index) => (
                        <span key={genre.id}>
                                {`${genre.name}`}
                                {index !== indexDetailed.genres.length - 1 && ", "}
                            </span>
                        )
                    )}
                </div>
                </>
                }
        

            </div>}
            
              

        </div>

        
    );
}

export default CategoryListCard;
