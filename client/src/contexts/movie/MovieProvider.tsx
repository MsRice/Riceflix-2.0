import { useCallback, useEffect, useState } from "react";
import { MovieContext} from "./MovieContext";
import type { CategoriesList, ContentDetails, MovieProviderProps, UsersList } from "../../utils/types";
import { useAuthentication } from "../auth/AuthenticationContext";


const MovieProvider = ({children}: MovieProviderProps) => {


    const [categoriesList , setCategoriesList] = useState<CategoriesList | null>(null)
    const [userList , setUserList] = useState<UsersList>({favorites: [], watchlist: [], history: []})
    const [loading , setLoading] = useState(false)
    const { token , activeProfileId} = useAuthentication()

    

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


    
    const getUsersList = useCallback(async () => {
            if (!activeProfileId) return;
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profiles/${activeProfileId}/list`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                
                if(!res.ok){
                    const error = await res.json()
                    throw new Error(error.message)
                }

                const data = await res.json()
                setUserList(data)

            } catch (error) {
                console.error(error)
            }
     },[activeProfileId ,  token])

    useEffect(() => {

        getUsersList()

    }, [activeProfileId ,token])
    
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
        <MovieContext.Provider value={{categoriesList , userList, loading ,getUsersList, getContentDetails}}>
            {children}
        </MovieContext.Provider>
    )
}

export default MovieProvider;