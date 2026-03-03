import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../contexts/lang/LanguageContext";
import React, { useEffect, useRef, useState } from "react";
import type { ContentDetails } from "../../utils/types";
import { useMovie } from "../../contexts/movie/MovieContext";
import YouTube from "react-youtube";
import type { YouTubeProps } from "react-youtube";


import { FaPlay , FaPause } from "react-icons/fa6";
import { RxEnterFullScreen } from "react-icons/rx";
import { RiVolumeUpFill , RiVolumeMuteFill , RiVolumeDownFill } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";

const Watch = () => {
    const { contentId , type } = useParams()
    const {language} = useLanguage()
    const { getContentDetails } = useMovie()
    const navigate = useNavigate()
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [watchDetails , setWatchDetails] = useState<ContentDetails | null>(null)
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const progress = (currentTime / duration) * 100;
    const [ playing , setPlaying ] = useState(true)
    const [ volume , setVolume ] = useState(100)
    const [controlsVisible, setControlsVisible] = useState(false);

    useEffect(() =>{
        if (!contentId) return;
        

        if (type === "movie" || type === "tv") {
            getContentDetails(
                Number(contentId),
                type,
                language === "en" ? "en-US" : "es-ES"
            ).then(setWatchDetails)
                
        }
   
    },[contentId, type, language, getContentDetails])

    const trailer = watchDetails?.raw_tmdb?.videos?.results
        ?.find(
        (el) =>
            ["Official Trailer", "Official Teaser" , "Teaser" , "Trailer"].some((keyword) =>
            el.name?.includes(keyword)
    ))

    const playerRef = useRef<YT.Player | null>(null);

    const onReady: YouTubeProps["onReady"] = (event) => {
        playerRef.current = event.target;
        const total = event.target.getDuration();
        setDuration(total);
    };


    const handleOverlayPlay = (e:React.MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget){
            handlePlay()
        }
    }
    const handlePlay = () => {
        if (!playerRef.current) return;

        if (playing) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }

        setPlaying(prev => !prev)

    };
   const handleMute = () => {
       setVolumeInt(0)
        playerRef.current?.mute();
    };
    const handleUnmute = () => {
        setVolumeInt(100)
        playerRef.current?.unMute();
    };
    const setVolumeInt = (value: number) => {
        playerRef.current?.setVolume(value); 
        setVolume(value)
    };
    const handleFullscreen = () => {
        containerRef.current?.requestFullscreen();;
    };

      const handleMouseMove = () => {
    setControlsVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 2000);
  };
    
    useEffect(() => {
    const interval = setInterval(() => {
            if (playerRef.current) {
            setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 500); 

        return () => clearInterval(interval);
    }, []);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
  const container = containerRef.current;
  if (!container) return;


  container.addEventListener("mousemove", handleMouseMove);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, []);

    return (
        <>
        {trailer && 
        <div className="watch__container" ref={containerRef} onMouseMove={handleMouseMove}>
            
            <div key={trailer.id} className="watch--wrapper">
                        <YouTube 
                            videoId={trailer.key}
                            className='watch__frame'
                            onReady={onReady}
                            title="Trailer"
                            
                            opts={{
                                width: "100%",
                                height: "100%",
                                playerVars: {
                                    autoplay: 1,
                                    mute:0,
                                    controls: 0,
                                    fullscreen: 1,
                                    loop: 1,
                                    modestbranding: 1,
                                    rel: 0, 
                                    iv_load_policy: 3,
                                    playsinline: 1,
                                    playlist: trailer.key, 
                                    origin: window.location.origin,
                                }
                            }}
                        />
                            
            </div>
            <div onClick={handleOverlayPlay} className={`video-controls__overlay ${controlsVisible ? "visible" : ''}`}>
                <div className="control__container--back">
                    <button className="control__container--btn" onClick={() => navigate(-1)}><FaArrowLeft /></button>
                </div>

                <div className="control__container--tracker">

                    <div className="control__seek--track">
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            className="control__seek--slider"
                            style={{ "--fill-percent": `${progress}%` } as React.CSSProperties}
                            onChange={(e) =>
                                playerRef.current?.seekTo(Number(e.target.value), true)
                            }
                            />
                        
                    </div>
                </div>

                <div className="control__container--play">{
                    !playing ?
                    <button className="control__container--btn" onClick={handlePlay}><FaPlay /></button>
                :    <button className="control__container--btn" onClick={handlePlay}><FaPause /></button>
                }
                </div>

                <div className="control__container--volume">
                    <div className="control__volume--track">

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            className="control__volume--slider"
                            onChange={(e) => setVolumeInt(Number(e.target.value))}
                        />
                    </div>
                    { volume !== 0 && volume > 50 && <button className="control__container--btn volume-btn" onClick={handleMute}><RiVolumeUpFill /></button>}
                    { volume !== 0 && volume < 50 && <button className="control__container--btn volume-btn" onClick={handleMute}><RiVolumeDownFill /></button>}
                    { volume === 0 && <button className="control__container--btn volume-btn" onClick={handleUnmute}><RiVolumeMuteFill /></button>}
                    
                </div>

                <div className="control__container--fullscreen">
                    <button className="control__container--btn" onClick={handleFullscreen}><RxEnterFullScreen /></button>
                </div>


               
            </div>
            
        </div>
        }
        </>
    );
}

export default Watch;
