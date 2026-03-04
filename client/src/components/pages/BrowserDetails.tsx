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

    function handlePlay(contentId:number ,listName:ProfileListTypes, type: "movie" | "tv" | undefined  ){
        
        handleListUpdate(contentId ,listName)
        navigate(`/watch/${contentId}/${type}`)
        
    }

    function handleListUpdate(contentId:number ,listName:ProfileListTypes ){
                
        const profileId = activeProfile?._id || 'null'
        updateProfileList({profileId, contentId , listName})

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


    function structureDetails(data: ContentDetails | null){
        console.log('sdb4polin and their polin haired baby' , data)

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
                trailer,
                releaseYear: tvData.first_air_date?.slice(0,4),
                season_ct: seasons ? `${seasons} Season${seasons > 1 ? "s" : ""}` : null,
                maturityRating,
                description: data?.description ?? null,
                cast: tvData.credits.cast.slice(0,10) ?? [],
                genres: tvData.genres,
                tagLine: tvData.tagline,
                network: tvData.networks[0] ?? null,
                creators: tvData.created_by.map( c => c.name)
            }

            setBrowserDetails(structuredDetails)
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


    console.log('sdb4polin' , browserDetails)
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
                                    <ButtonMain className='play-btn' onClick={() => handlePlay(Number(browserDetails?._id) ,"history" , type)}><FaPlay className="button-svg"/>{t("play")}</ButtonMain>

                                    <div className='detail-btns'><button className="browser-detail-btn" onClick={() => handleListUpdate(Number(browserDetails?._id) ,"watchlist")}><FaPlus /></button></div>
                                    <div className='detail-btns'><button className="browser-detail-btn" onClick={() => handleListUpdate(Number(browserDetails?._id) ,"favorites")}><HiOutlineThumbUp  /></button></div>
                                </div>
                                <div className='bdTrailer__subinfo--wrapper'>
                    
                                    <button className="browser-detail-btn volume-btn" onClick={toggleMute}>{volume ? <RiVolumeUpFill /> : <RiVolumeMuteFill />}</button>

                                </div>

                            </div>
                        </>
                        }

                    </div>
                    
                    {browserDetails?.type === 'movie' &&
                    <div className='browser-details__details--container'>
                        <div>
                            <div>
                                {`${browserDetails?.releaseYear}`} | {`${browserDetails?.runtime}`} | {`${browserDetails?.maturityRating}`}
                            </div>
                            <div>
                                {`${browserDetails?.tagLine}`}
                            </div>
                            <div className='production_co__image--wrapper'>
                                <img src={`https://image.tmdb.org/t/p/w185${browserDetails?.production_co?.logo_path}`} alt="" />
                                
                            </div>
                            <div>
                                {`${browserDetails?.description}`}
                            </div>
                        </div>
                        <div>
                            <div> Cast: {browserDetails?.cast.map(m => {
                                return `${m.name},`
                            }).slice(0,3)} 
                            </div>
                            <div> Genres: {browserDetails?.genres.map(m => {
                                return `${m.name},`
                            }).slice(0,3)} 
                            </div>
                        </div>
                      

                    </div>
                    }



                    {browserDetails?.type === 'tv' &&
                    <div className='browser-details__details--container'>
                        TV:
                        {`${browserDetails?.releaseYear}`} {/* Release Year */}
                        {`${browserDetails?.releaseYear}`} {/* Duration */}

                    </div>
                    }
                  
                  {browserDetails?.type === 'movie' &&
                    <div className="browser__more-opts--wrapper">
                        <h2>More Like This</h2>
                        {browserDetails.similar.map((movie) => {
                            return (
                                <div className="category__image--wrapper" key={movie.id}>
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
                        })}

                        <div></div>

                    </div>
                    }
                

                    {browserDetails?.type === 'movie' &&
                    <div className='browser-details__footer-details--container'>
                        <h2>{`About ${browserDetails.title}`}</h2>
                        <div>Director:{`${browserDetails?.directors.slice(0,5)},`}</div>
                        <div> Cast: {browserDetails?.cast.map(m => {
                            return `${m.name},`
                        }).slice(0,8)} 
                        </div>
                        <div> Genres: {browserDetails?.genres.map(m => {
                            return `${m.name},`
                        }).slice(0,5)} 
                        </div>
                        <div>Maturity Rating: {`${browserDetails?.maturityRating}`}</div>
                      

                    </div>
                    }



                    {browserDetails?.type === 'tv' &&
                    <div className='browser-details__footer-details--container'>
                        TV:
                        {`${browserDetails?.releaseYear}`} {/* Release Year */}
                        {`${browserDetails?.releaseYear}`} {/* Duration */}

                    </div>
                    }
                </div>

            </div>
        </div>
    );
}

export default BrowserDetails;
