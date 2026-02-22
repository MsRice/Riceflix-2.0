import { useCallback, useEffect, useState } from "react";
import { MovieContext} from "./MovieContext";
import type { CategoriesList, ContentDetails, MovieProviderProps } from "../../utils/types";
import { useAuthentication } from "../auth/AuthenticationContext";


const MovieProvider = ({children}: MovieProviderProps) => {


    const [categoriesList , setCategoriesList] = useState<CategoriesList | null>(null)
    const [loading , setLoading] = useState(false)
    const { token } = useAuthentication()
    useEffect(() =>{

        const getCategoriesList = async() => {
     
            try {
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/content/wall`)
                if(!res.ok){
                    const error = await res.json()
                    throw new Error(error.message)
                }
                const categories = await res.json()
                setCategoriesList(categories)
                
            } catch (error) {
                console.error(error);
                
            } finally{
                setLoading(false)
            }
        }
        
        getCategoriesList()
    },[])
    
    const getContentDetails = useCallback(
    
        async(contentId: number , type: "movie" | "tv" | undefined , language: "en-US" | "es-ES"): Promise<ContentDetails | null> => {
            try{
                
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/content/${contentId}?type=${type}&language=${language}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                            }
                    }
                )
                if(!res.ok){
                    const error = await res.json()
                    throw new Error(error.message)
                }

                const details = await res.json()
                return details

            }catch (error) {
                console.error("Content Detail Error:" , error);
                return null
                
            } finally{
                setLoading(false)
            }

    },[token]
    )

    return(
        <MovieContext.Provider value={{categoriesList , loading , getContentDetails}}>
            {children}
        </MovieContext.Provider>
    )
}

export default MovieProvider;