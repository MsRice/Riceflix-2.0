import { useTranslation } from 'react-i18next';
import riceflix_logo  from '../../assets/images/Riceflix_Logos/Riceflix logo.png'
import ButtonMain from '../ui/ButtonMain';
import { IoLanguageSharp } from "react-icons/io5";
import { useLanguage } from '../../contexts/lang/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import { TiArrowSortedDown } from "react-icons/ti";
const Navbar = () => {
    const { t } = useTranslation()
    const { language , setLanguage } = useLanguage()
    const [ openLangMenu , setOpenLangMenu ] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(
                menuRef.current && !menuRef.current.contains(event.target as Node)
            ){
                setOpenLangMenu(!openLangMenu)
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);

        }
    },[openLangMenu])
    
    return (
        <nav className='navigation--wrapper'>
            <div className='navigation-title--wrapper'><img className='navigation-logo' src={riceflix_logo} alt="Riceflix Logo" /></div>
            <div className='navigation--nav'>
                <div className='navigation-dropdown--wrapper'>
                    <div className='navigation-input--dropdown' onClick={() => {setOpenLangMenu((prev) => !prev)}}>
                        <div><IoLanguageSharp /></div> <div>{language == 'en' ? t("english") : t("spanish")} </div> <div><TiArrowSortedDown /></div>

                    </div>
                    {openLangMenu && 
                    <div ref={menuRef} className='navigation--dropdown'>
                        <li className='dropdown_lang' onClick={() => setLanguage('en')}>{t("english")}</li>
                        <li className='dropdown_lang' onClick={() => setLanguage('es')}>{t("spanish")}</li>
                    </div>
                    }
                </div>
                <ButtonMain to='/login' className={'primary-btn'}>{t('signin')}</ButtonMain>
            </div>
        </nav>
    );
}

export default Navbar;
