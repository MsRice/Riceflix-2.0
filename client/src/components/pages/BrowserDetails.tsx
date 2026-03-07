import { useNavigate, useParams } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { useEffect, useRef, useState } from 'react';
import { useMovie } from '../../contexts/movie/MovieContext';
import { useLanguage } from '../../contexts/lang/LanguageContext';
import type { ContentDetails, MetaBrowserDetailsData, MetaBrowserDetailsMovieData, MetaBrowserDetailsTvData, ProfileListTypes, RawTMDBMovieDetails, RawTMDBTVDetail } from '../../utils/types';
import YouTube, { type YouTubeProps } from 'react-youtube';
import ButtonMain from '../ui/ButtonMain';
import { useAuthentication } from '../../contexts/auth/AuthenticationContext';
import { FaPlay, FaPlus } from 'react-icons/fa6';
import { HiOutlineThumbUp } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri';
import SectionTitle from '../ui/SectionTitle';
import { IoIosArrowUp ,  IoIosArrowDown } from "react-icons/io";

const BrowserDetails = () => {
    const navigate = useNavigate();
    const { getContentDetails } = useMovie()
    const { language } = useLanguage()
    const [ browserDetails , setBrowserDetails] = useState<MetaBrowserDetailsData | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { activeProfile , updateProfileList } = useAuthentication()
    const { t } = useTranslation()
    const [ volume , setVolume ] = useState(false)
    
    
    type Params = {
        contentId?: string;
        type?: "movie" | "tv";
    };
    const { contentId , type} = useParams<Params>()

    function handlePlay(contentId:number ,listName:ProfileListTypes, type: "movie" | "tv" | undefined ){
        
        handleListUpdate(contentId ,listName , type)
        navigate(`/watch/${contentId}/${type}`)
        
    }

    function handleListUpdate(contentId:number ,listName:ProfileListTypes , type: "movie" | "tv" | undefined){
                
        const profileId = activeProfile?._id || 'null'
        updateProfileList({profileId, contentId , listName , type})

    }

    const playerRef = useRef<YT.Player | null>(null);
    const onPlayerReady: YouTubeProps["onReady"] = (event) => {
        playerRef.current = event.target;
    };

    const toggleMute = () => {
        if(!playerRef.current) return

        if(playerRef.current.isMuted()){

            playerRef.current?.unMute();
            setVolume(true)
        }else{
            
            playerRef.current?.mute();
            setVolume(false)
        }

    };

    // function handleBrowseDetails(contentId:number){
    //     console.log(contentId ,type)


    //     navigate(`/browse/${contentId}/${type}` , {
    //        state: {
    //             backgroundLocation: {
    //             pathname: location.pathname,
    //             search: location.search,
    //             hash: location.hash
    //             }
    //         }
    //     })

    // }


    function structureDetails(data: ContentDetails | null){

        const trailer = data?.raw_tmdb?.videos?.results
            ?.find(
            (el) =>
                ["Official Trailer", "Official Teaser" , "Teaser" , "Trailer"].some((keyword) =>
                el.name?.includes(keyword)
        ))

        if(type === "movie"){

            const movieData = data?.raw_tmdb as RawTMDBMovieDetails;
            const runtime = movieData.runtime ?? 0;

            const hours = Math.floor(runtime / 60);
            const mins = runtime % 60;

            const formattedRuntime =
                hours > 0 && mins > 0
                ? `${hours}h ${mins}m`
                : hours > 0
                ? `${hours}h`
                : `${mins}m`;

           

            const maturityRating = movieData.release_dates.results?.find(r => r.iso_3166_1 === "US")
                ?.release_dates?.find(r => r.certification)?.certification || "NR";

            const writers = movieData.credits.crew?.filter(c => c.known_for_department === 'Writing')?.map(c => c.name);
            const directors = movieData.credits.crew?.filter(c => c.known_for_department === 'Directing')?.map(c => c.name);
            
            
            const structuredDetails : MetaBrowserDetailsMovieData = {
                type: "movie" as const,
                _id: data?._id ?? null,
                title: data?.title ?? null,
                contentId: movieData.id,
                trailer,
                releaseYear: data?.release_date?.slice(0,4),
                runtime: formattedRuntime,
                description: data?.description ?? null,
                tagLine: movieData.tagline,
                production_co: movieData.production_companies[0] ?? null,
                genres: movieData.genres,
                maturityRating,
                similar: movieData.similar.results,
                cast: movieData.credits.cast.slice(0,10) ?? [],
                writers,
                directors,

            }

            setBrowserDetails(structuredDetails)
        }

        if(type === "tv"){

            const tvData = data?.raw_tmdb as RawTMDBTVDetail;

            const maturityRating = tvData.content_ratings?.results
            ?.find(r => r.iso_3166_1 === "US")
            ?.rating || "NR";

            const seasons = tvData.number_of_seasons ?? 0;

            const structuredDetails: MetaBrowserDetailsTvData = {
                type: "tv" as const,
                _id: data?._id ?? null,
                title: data?.title ?? null,
                contentId: tvData.id,
                trailer,
                releaseYear: tvData.first_air_date?.slice(0,4),
                season_ct: seasons ? `${seasons} Season${seasons > 1 ? "s" : ""}` : null,
                maturityRating,
                description: data?.description ?? null,
                cast: tvData.credits.cast.slice(0,10) ?? [],
                genres: tvData.genres,
                tagLine: tvData.tagline,
                similar: tvData.similar.results,
                network: tvData.networks[0] ?? null,
                creators: tvData.created_by.map( c => c.name)
            }

            setBrowserDetails(structuredDetails)
        }
          
    }

    const [ moreCount , setMoreCount ] = useState(9)

    function handleMore(){
        if (moreCount === 9){
            setMoreCount(15)
        } else{
            setMoreCount(9)

        }
    }

    useEffect(() =>{
            if (!contentId) return;
            
    
            if (type === "movie" || type === "tv") {
                getContentDetails(
                    Number(contentId),
                    type,
                    language === "en" ? "en-US" : "es-ES"
                ).then(structureDetails)
                    
            }
       
        },[contentId, type, language, getContentDetails])
    
        

    
    useEffect(() => {

        const container = containerRef.current
        const handleMouseDown = (event: MouseEvent) => {
            if(!container) return
            if(!container.contains(event.target as Node)){

                navigate(-1) 
            }
        }

        document.addEventListener("mousedown" , handleMouseDown)

        return () =>{
            document.removeEventListener('mousedown' , handleMouseDown)
        }

    },[navigate])


    return (
        <div className='modal--wrapper'>
            <div className="modal--container" ref={containerRef} onClick={(e) => e.stopPropagation()}>
                <div className="modal__details--container">
                    <div className='exit-btn--wrapper' onClick={() => navigate(-1)}>
                        <RxCross2 className='exit-btn'/>
                    </div>

                    <div className="browser-details__banner--container">
                        {browserDetails && <>
                        
                            <div key={browserDetails.trailer?.id} className='browser-details__trailer--wrapper'>
                                <YouTube
                                videoId={browserDetails.trailer?.key}
                                onReady={onPlayerReady}
                                className='browser-details__frame'
                                title="Trailer"
                                
                                opts={{
                                    width: "100%",
                                    height: "100%",
                                    playerVars: {
                                        autoplay: 1,
                                        mute:1,
                                        controls: 0,
                                        fullscreen: 1,
                                        loop: 1,
                                        modestbranding: 1,
                                        rel: 0, 
                                        iv_load_policy: 3,
                                        playsinline: 1,
                                        playlist: browserDetails.trailer?.key, 
                                        origin: window.location.origin,
                                    }
                                }}
                            />
                            </div>
                            <div className='bdTrailer__trailer--info'>
                                <div className='bdTrailer__info--wrapper'>
                                    <ButtonMain className='play-btn' onClick={() => handlePlay(browserDetails?.contentId ,"history" , type)}><FaPlay className="button-svg"/>{browserDetails.type =='movie' ? `${t("play")}` : 'Next Episode'}</ButtonMain>

                                    <div className='detail-btns'><button className="browser-detail-btn" onClick={() => handleListUpdate(browserDetails?.contentId ,"watchlist" ,type)}><FaPlus /></button></div>
                                    <div className='detail-btns'><button className="browser-detail-btn" onClick={() => handleListUpdate(browserDetails?.contentId ,"favorites" ,type)}><HiOutlineThumbUp  /></button></div>
                                </div>
                                <div className='bdTrailer__subinfo--wrapper'>
                    
                                    <button className="browser-detail-btn volume-btn" onClick={toggleMute}>{volume ? <RiVolumeUpFill /> : <RiVolumeMuteFill />}</button>

                                </div>

                            </div>
                        </>
                        }

                    </div>
                    
                    {browserDetails?.type === 'movie' &&
                    <>

                    <div className='browser-details__details--container'>
                        <div className='browser-details__info--container'>
                            <div className='browser-details__info--wrapper'>
                                <div className='browser-details__info--info'>

                                    <span className='detail-span'>{`${browserDetails?.releaseYear}  |  ${browserDetails?.runtime} | ${browserDetails?.maturityRating}`}</span>
                                    <span className='detail-span'>{`${browserDetails?.tagLine}`}</span>
                         
                                </div>

                                {browserDetails.production_co?.logo_path ? <div className='production_co__image--wrapper'>
                                    <img src={`https://image.tmdb.org/t/p/w185${browserDetails?.production_co?.logo_path}`} className='production_co__image' alt="" />
                                </div> : 
                                <div className='production_co__image--wrapper'>
                                    <p>{`${browserDetails.production_co?.name}`}</p>
                                </div>
                                }

                            </div>

                            <div>
                                <span className='detail-span'>{`${browserDetails?.description}`}</span>
                            </div>
                        </div>
                        <div className='browser-details__sub-info--container'>
                            <div> <span className='detail-span span-title'>Cast:</span> <span className='span-list'> {browserDetails?.cast.map(m => {
                                return `${m.name},`
                            }).slice(0,3)} </span>
                            </div>
                            <div> <span className='detail-span span-title'>Genres:</span> <span className='span-list'> {browserDetails?.genres.map(m => {
                                return `${m.name},`
                            }).slice(0,3)} </span>
                            </div>
                        </div>

                    </div>

                 
                    <div className="browser__more-opts--container">

                        <h2 className="browser__more-opts--title">More Like This</h2>
                        <div className="browser__more-opts--wrapper">
                            {browserDetails.similar.map((movie) => {
                                return (
                                    <div className="category__image--wrapper" key={movie.id} onClick={() => handlePlay(movie.id , "history" , type)}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                        className="category__cardImage--image"
                                        alt={movie.name || movie.title}
                                    />

                                    <p className="category__card-title">
                                        {movie.name || movie.title}
                                    </p>
                                    </div>
                                );
                            }).slice(0,moreCount)}



                        </div>
                            {browserDetails.similar.length > 9 &&
                                <div className='dividor'><button onClick={handleMore}>{moreCount === 9 ? <IoIosArrowDown />: <IoIosArrowUp />}</button></div> 
                            
                            }
                    </div>

                    
                

                    <div className='browser-details__footer-details--container'>
                        <SectionTitle className='primary-title'>{`About ${browserDetails.title}`}</SectionTitle>
                        <div><span className='detail-span span-title'>Director:</span> <span className='span-list'>{`${browserDetails?.directors.slice(0,5)},`}</span></div>
                        <div> 
                            <span className='detail-span span-title'>Cast:</span> <span className='span-list'> {browserDetails?.cast.map(m => {
                                return `${m.name},`
                            }).slice(0,8)} </span>
                        </div>
                        <div> 
                            <span className='detail-span span-title'>Writers:</span> <span className='span-list'> {browserDetails?.writers.slice(0,1)} </span>
                        </div>
                        <div> <span className='detail-span span-title'>Genres:</span> <span className='span-list'> {browserDetails?.genres.map(m => {
                                return `${m.name},`
                            }).slice(0,5)} </span>
                        </div>
                        <div><span className='detail-span span-title'>Maturity Rating:</span> {`${browserDetails?.maturityRating}`}</div>
                      

                    </div>
                   </>}





                    {browserDetails?.type === 'tv' &&
                    <>

                    <div className='browser-details__details--container'>
                        <div className='browser-details__info--container'>
                            <div className='browser-details__info--wrapper'>
                                <div className='browser-details__info--info'>

                                    <span className='detail-span'>{`${browserDetails?.releaseYear}  |  ${browserDetails?.season_ct} | ${browserDetails?.maturityRating}`}</span>
                                    <span className='detail-span'>{`${browserDetails?.tagLine}`}</span>
                         
                                </div>

                                { browserDetails.network?.logo_path && <div className='production_co__image--wrapper'>
                                    <img src={`https://image.tmdb.org/t/p/w185${browserDetails?.network?.logo_path}`} className='production_co__image' alt="" />
                                </div>}

                            </div>

                            <div>
                                <span className='detail-span'>{`${browserDetails?.description}`}</span>
                            </div>
                        </div>
                        <div className='browser-details__sub-info--container'>
                            <div> <span className='detail-span span-title'>Cast:</span> <span className='span-list'> {browserDetails?.cast.map(m => {
                                return `${m.name},`
                            }).slice(0,3)} </span>
                            </div>
                            <div> <span className='detail-span span-title'>Genres:</span> <span className='span-list'> {browserDetails?.genres.map(m => {
                                return `${m.name},`
                            }).slice(0,3)} </span>
                            </div>
                        </div>

                    </div>

                    <div className="browser__more-opts--container">

                        <h2 className="browser__more-opts--title">More Like This</h2>
                        <div className="browser__more-opts--wrapper">
                            {browserDetails.similar.map((movie) => {
                                return (
                                    <div className="category__image--wrapper" key={movie.id} onClick={() => handlePlay(movie.id , "history" , type)}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                        className="category__cardImage--image"
                                        alt={movie.name || movie.title}
                                    />

                                    <p className="category__card-title">
                                        {movie.name || movie.title}
                                    </p>
                                    </div>
                                );
                            }).slice(0,moreCount)}



                        </div>
                            {browserDetails.similar.length > 9 &&
                                <div className='dividor'><button onClick={handleMore}>{moreCount === 9 ? 'More': 'Less'}</button></div> 
                            
                            }
                    </div>

                    <div className='browser-details__footer-details--container'>
                        <SectionTitle className='primary-title'>{`About ${browserDetails.title}`}</SectionTitle>
                        <div><span className='detail-span span-title'>Creators:</span> <span className='span-list'>{`${browserDetails?.creators.slice(0,5)},`}</span></div>
                        <div> 
                            <span className='detail-span span-title'>Cast:</span> <span className='span-list'> {browserDetails?.cast.map(m => {
                                return `${m.name},`
                            }).slice(0,8)} </span>
                        </div>
                        <div> <span className='detail-span span-title'>Genres:</span> <span className='span-list'> {browserDetails?.genres.map(m => {
                                return `${m.name},`
                            }).slice(0,5)} </span>
                        </div>
                        <div><span className='detail-span span-title'>Maturity Rating:</span> {`${browserDetails?.maturityRating}`}</div>
                      

                    </div>
                   


                    </>
                    }
                </div>

            </div>
        </div>
    );
}

export default BrowserDetails;
