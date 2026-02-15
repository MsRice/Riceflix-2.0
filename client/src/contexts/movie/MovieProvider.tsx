import { useEffect, useState } from "react";
import { MovieContext} from "./MovieContext";
import type { MovieProviderProps } from "../../utils/types";

const MovieProvider = ({children}: MovieProviderProps) => {


    const [categoriesList , setCategoriesList] = useState<[]>([])
    const [loading , setLoading] = useState(false)

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

    return(
        <MovieContext.Provider value={{categoriesList , loading}}>
            {children}
        </MovieContext.Provider>
    )
}

export default MovieProvider;