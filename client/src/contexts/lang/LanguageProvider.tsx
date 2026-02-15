import { useEffect, useState } from "react";
import type { LanguageProviderProps } from "../../utils/types";
import { LanguageContext } from "./LanguageContext";
import i18n from "../../utils/i18n";

const LanguageProvider = ({children}: LanguageProviderProps) => {
    const [language , setLanguage] = useState(
        localStorage.getItem('lang') || 'en'
    )


    useEffect(() => {
        i18n.changeLanguage(language)
        localStorage.setItem('lang' , language)
    }, [language])
    return (
        <LanguageContext.Provider value={{language , setLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageProvider;
