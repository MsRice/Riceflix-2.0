import type { CategoryMovie, ContentDetails, MetaCategoryData, ProfileListTypes } from "../../utils/types";
import { IoPlay } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineThumbUp } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useMovie } from "../../contexts/movie/MovieContext";
import { useState } from "react";
import { useLanguage } from "../../contexts/lang/LanguageContext";
import { useAuthentication } from "../../contexts/auth/AuthenticationContext";
import {  useLocation , useNavigate } from "react-router-dom";


const CategoryCard = ({item}:{item: CategoryMovie}) => {
    const { getContentDetails } = useMovie()
    const { activeProfile , updateProfileList } = useAuthentication()
    const [indexDetailed , setIndexDetailed] = useState<MetaCategoryData | null>(null)
    const { language } = useLanguage()
    const navigate = useNavigate()
    const location = useLocation()


    const mockTvDetails: MetaCategoryData = {
        type: 'tv', 
        trailer: {
            id: "5f7430d0156cc70036480af6",
            iso_639_1: "en",
            iso_3166_1: "US",
            key: "VpO6APNqY1c",
            name: "Official Trailer 3 [Subtitled]",
            official: true,
            published_at: "2020-09-30T07:00:08.000Z",
            site: "YouTube",
            size: 1080,
            type: "Trailer"
        }, 
        season_ct: '3 Season', 
        production_co: {
            id: 21444,
            logo_path: "/wSejGn3lAZdQ5muByxvzigwyDY6.png",
            name: "MAPPA",
            origin_country: "JP"
        },
        genres: [
            {id: 16, name: 'Animation'}, 
            {id: 10759, name: 'Action & Adventure'},
            {id: 10765, name: 'Sci-Fi & Fantasy'}
        ]
    }
    const mockMovieDetails:MetaCategoryData = {
        type: 'movie', 
        trailer: {
            id: "68e68b81eaceb2b58e73d3e0",
            iso_639_1: "en",
            iso_3166_1: "US",
            key: "SK_DEabMNVg",
            name: "Official Trailer [Subtitled]",
            official: true,
            published_at: "2025-10-08T15:59:01.000Z",
            site: "YouTube",
            size: 1080,
            type: "Trailer",
        }, 
        runtime: '2h 19m', 
        production_co: {
            id: 199265, 
            logo_path: "/mv2yDqAgT1ea1eTXZMDr89zX95M.png",
            name: "CJ ENM Studios",
            origin_country: "KR"
        }, 
        genres: [
            {id: 35, name: 'Comedy'},
            {id: 80, name: 'Crime'},
            {id: 53, name: 'Thriller'}
        ]
    }

    const fetchDetails = async () => {
        if (indexDetailed) return;
            const contentDetails = await getContentDetails(
                item.id,
                item.media_type ?? "movie",
                language === "en" ? "en-US" : "es-ES"
            );

            if (!contentDetails) return; 

            const meta = metaCategoryData(contentDetails)
            
            setIndexDetailed(meta)
    }

    function handlePlay(contentId:number ,listName:ProfileListTypes, type: "movie" | "tv" | undefined  ){
      
        handleListUpdate(contentId ,listName)
        navigate(`/watch/${contentId}/${type}`)
        
    }

    function handleListUpdate(contentId:number ,listName:ProfileListTypes ){
        

     
        const profileId = activeProfile?._id || 'null'

        updateProfileList({profileId, contentId , listName})


    }
    
    function handleBrowseDetails(contentId:number , type: "movie" | "tv" | undefined ){
        console.log(contentId)

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
        
        <div className="category__item--wrapper" onMouseEnter={() => setIndexDetailed(mockTvDetails)}>
            <div>
                {item.backdrop_path && 
                <div className="category__image--wrapper" >
                    <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} className="category__cardImage--image" alt="" />
                    <p className="category__card-title">{`${item.name || item.title}`}</p>
                </div>
                }
            </div>
            
            {indexDetailed ?
            <div className="category__details--wrapper">
                
                <div className="details__btns--wrapper">
                    <div className="btns--wrapper">
                        <div className="detail-btn play" onClick={() => handlePlay(item.id ,"history" , item.media_type)}><IoPlay  /></div>
                        <div className="detail-btn" onClick={() => handleListUpdate(item.id ,"watchlist")}><FaPlus /></div>
                        <div className="detail-btn" onClick={() => handleListUpdate(item.id ,"favorites")}><HiOutlineThumbUp  /></div>
                    </div>
                    <div>
                        <div className="detail-btn" onClick={() => handleBrowseDetails(item.id , item.media_type)}><MdOutlineKeyboardArrowDown  /></div>
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
        

            </div>
            :<div>loading</div>}
              

        </div>

        
    );
}

export default CategoryCard;
