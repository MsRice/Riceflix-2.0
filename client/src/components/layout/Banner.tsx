import Navbar from './Navbar';
import landing_banner from '../../assets/images/Netflix_assets/landingimage_large.jpg'
import ButtonMain from '../ui/ButtonMain';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useTranslation } from 'react-i18next';
const Banner = () => {
    const { t } = useTranslation()
    return (
         <div className='landing__banner--wrapper'>
                <div className='banner__image--wrapper'>
                    <Navbar />
                    <img src={landing_banner} className='banner__image--img' alt="" />
                </div>
                <div className='hero__header--wrapper'>
                    <h1>{t("hero_title")}</h1>
                    <h3>{t("hero_subtitle")}</h3>
                    <h6>{t("hero_subtitle_info")}</h6>
                   <form className='hero__header--form'><input id='email' type="text" placeholder='Email address' /> <ButtonMain to='/registration' className={'primary-btn get-started'}>{t('get_started')}<MdKeyboardArrowRight /></ButtonMain></form>

                </div>
            </div>
    );
}

export default Banner;
