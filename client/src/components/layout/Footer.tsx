import { useEffect, useRef, useState } from "react";
import { IoLanguageSharp, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import { useLanguage } from "../../contexts/lang/LanguageContext";
import { useTranslation } from "react-i18next";
import { FaHandshake } from "react-icons/fa";
import RiceCodes  from "../../assets/images/rice_codesLOGOS/Rice_logo_only_no_background.svg?react";

const Footer = () => {
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
        <footer>
            <div className="footer__header--wrapper">
                <p>{t("questions")}<a href="tel:1-866-952-4456">1-866-952-4456</a></p>
            </div>
            <div className="footer__links--wrapper">
                <ul className="footer__links">
                    <li><a href="#">{t("footer_link_1")}</a></li>
                    <li><a href="#">{t("footer_link_2")}</a></li>
                    <li><a href="#">{t("footer_link_3")}</a></li>
                    <li><a href="#">{t("footer_link_4")}</a></li>
                    <li><a href="#">{t("footer_link_5")}</a></li>
                    <li><a href="#">{t("footer_link_6")}</a></li>
                    <li><a href="#">{t("footer_link_7")}</a></li>
                    <li><a href="#">{t("footer_link_8")}</a></li>
                    <li><a href="#">{t("footer_link_9")}</a></li>
                    <li><a href="#">{t("footer_link_10")}</a></li>
                    <li><a href="#">{t("footer_link_11")}</a></li>
                    <li><a href="#">{t("footer_link_12")}</a></li>
                    <li><a href="#">{t("footer_link_13")}</a></li>
                    <li><a href="#">{t("footer_link_14")}</a></li>
                    <li><a href="#">{t("footer_link_15")}</a></li>
                    <li><a href="#">{t("footer_link_16")}</a></li>
                    <li><a href="#">{t("footer_link_17")}</a></li>
                    <li><a href="#">{t("footer_link_18")}</a></li>
                    <li><a href="#">{t("footer_link_19")}</a></li>
                    <li><a href="#">{t("footer_link_20")}</a></li>
                    <li><a href="#">{t("footer_link_21")}</a></li>
                </ul>

            </div>
            <div className="footer__connect--wrapper">
                <div className='navigation-dropdown--wrapper footer-dropdown'>
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
                <div className="social__links--wrapper">
                    <p>{t("author")}</p>
                <ul className="social__links">
                    <li className="social__link"><a href="https://app.joinhandshake.com/profiles/gqqjmh" target="_blank">
                        <FaHandshake />
                    </a></li>
                    <li className="social__link"><a href="https://https://github.com/MsRice" target="_blank">
                        <IoLogoGithub />
                    </a></li>
                    <li className="social__link"><a href="https://www.linkedin.com/in/patrice-maxwell" target="_blank">
                        <IoLogoLinkedin />
                    </a></li>
                    <li className="social__link"><a href="https://www.thegrainofrice.com/patricemaxwell" target="_blank">
                        <RiceCodes className="rice__code--svg "/>
                    </a></li>
                </ul>
                </div>
                <div></div>
            </div>
            
        </footer>
    );
}

export default Footer;
