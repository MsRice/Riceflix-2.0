import { useTranslation } from "react-i18next";
import SectionTitle from "../ui/SectionTitle";
import monitor from '../../assets/images/resaons_to_join_logos/monitor.png'
import down_arrow from '../../assets/images/resaons_to_join_logos/down_arrow.png'
import telescope from '../../assets/images/resaons_to_join_logos/telescope.png'
import user_logos from '../../assets/images/resaons_to_join_logos/user_logos.png'

const LandingMoreReasons = () => {
    const {t} = useTranslation()
    return (
        <div className="moreReasons__container--wrapper">
        <div className="moreReasons__row--wrapper">
            <SectionTitle className="primary-title">{t('more_reasons')}</SectionTitle>
            <div className="moreReasons__cards--wrapper">
                <div className="moreReasons__card--wrapper">
                    <div className="moreReasons__header--wrapper">
                        <h3 className="moreReasons__header--title">{t("more_reasons_title_1")}</h3>
                        <h5 className="moreReasons__header--subtitle">{t("more_reasons_subtitle_1")}</h5>
                    </div>
                    <div className="moreReasons__logo--wrapper">
                        <img className="moreReasons__logo--img" src={monitor} alt="" />
                    </div>
                </div>
                <div className="moreReasons__card--wrapper">
                    <div className="moreReasons__header--wrapper">
                        <h3 className="moreReasons__header--title">{t("more_reasons_title_2")}</h3>
                        <h5 className="moreReasons__header--subtitle">{t("more_reasons_subtitle_2")}</h5>
                    </div>
                    <div className="moreReasons__logo--wrapper">
                        <img className="moreReasons__logo--img" src={down_arrow} alt="" />
                    </div>
                </div>
                <div className="moreReasons__card--wrapper">
                    <div className="moreReasons__header--wrapper">
                        <h3 className="moreReasons__header--title">{t("more_reasons_title_3")}</h3>
                        <h5 className="moreReasons__header--subtitle">{t("more_reasons_subtitle_3")}</h5>
                    </div>
                    <div className="moreReasons__logo--wrapper">
                        <img className="moreReasons__logo--img" src={telescope} alt="" />
                    </div>
                </div>
                <div className="moreReasons__card--wrapper">
                    <div className="moreReasons__header--wrapper">
                        <h3 className="moreReasons__header--title">{t("more_reasons_title_4")}</h3>
                        <h5 className="moreReasons__header--subtitle">{t("more_reasons_subtitle_4")}</h5>
                    </div>
                    <div className="moreReasons__logo--wrapper">
                        <img className="moreReasons__logo--img" src={user_logos} alt="" />
                    </div>
                </div>
            </div>
            

        </div>
        </div>
    );
}

export default LandingMoreReasons;
