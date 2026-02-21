import { useTranslation } from 'react-i18next';
import riceflix_logo  from '../../assets/images/Riceflix_Logos/Riceflix logo.png'
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaRegBell, FaRegUser } from "react-icons/fa6";
import user_smile from '../../assets/images/Netflix_assets/user_smile.png'
import { useAuthentication } from '../../contexts/auth/AuthenticationContext';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { TiPencil } from "react-icons/ti";
import { FaUsersViewfinder ,FaRegCircleQuestion } from "react-icons/fa6";




const BrowserNavbar = () => {
    const { t } = useTranslation()
    const { activeProfile } = useAuthentication()

    const [ openLangMenu , setOpenLangMenu ] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    console.log(activeProfile)

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
        <nav className='browser-navigation--wrapper'>
            <div className='navigation-title--wrapper'>
                <Link to={'/'}><img className='navigation-logo' src={riceflix_logo} alt="Riceflix Logo" /></Link>
                <ul className='browser-nav__links'>
                    <li>Home</li>
                    <li>Show</li>
                    <li>Movies</li>
                    <li>Games</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                    <li>Browse by Language</li>
                </ul>    
            </div>
            <div className='navigation--nav'>
                <div><HiMiniMagnifyingGlass /></div>
                <div>Kids</div>
                <div><FaRegBell /></div>
                <div className='browser-navigation-dropdown--wrapper'>
                    <div className='browser-navigation'>

                        <div className={`navigation-profile_image--dropdown-wrapper ${activeProfile?.avatar_img}`} onClick={() => {setOpenLangMenu((prev) => !prev)}}>
                            <img src={`${user_smile}`} className="profile_image--img" />
                        </div>
                        <TiArrowSortedDown className='arrow-svg' />

                    </div>
                   
                    <div ref={menuRef} className='browser-navigation--dropdown'>

                        <TiArrowSortedUp className='arrowup-svg'/>
                        <ul>
                            <li className='dropdown_opt'><TiPencil />Manage Profiles</li>
                            <li className='dropdown_opt'><FaUsersViewfinder />Transfer Profile</li>
                            <li className='dropdown_opt'><FaRegUser />Account</li>
                            <li className='dropdown_opt'><FaRegCircleQuestion />Help Center</li>
                            <li className='dropdown_opt'>{t("signout")}</li>
                        </ul>
                    </div>
                
                </div>
                
            </div>
        </nav>
    );
}

export default BrowserNavbar;
