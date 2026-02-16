import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { RxCross1 } from "react-icons/rx";
import { useTranslation } from 'react-i18next';

const LandingFAQ = () => {


    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const { t } = useTranslation()

    const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
    }
    return (
        <div className="faq__container--wrapper">
            <div className="faq__row--wrapper">
                <SectionTitle className="primary-title">Frequently Asked Questions</SectionTitle>
                <div className='faq__cards--wrapper'>
                    <div className='faq__card--wrapper'>

                        <div className='faq__question--wrapper' onClick={() => toggleFAQ(0)}>
                            <h4>{t("faq_question_1")}</h4>
                            <h3 className={`faq__icon ${openIndex === 0 ? "faq_open" : ""}`}> <RxCross1 /></h3>
                        
                        </div>
                        <div className={`faq__answer--wrapper ${openIndex === 0 ? "faq_open" : ""}`}>
                            <h4>{t("faq_answer_1")}</h4>
                            
                        
                        </div>
                    </div>
                    <div className='faq__card--wrapper'>

                        <div className='faq__question--wrapper' onClick={() => toggleFAQ(1)}>
                            <h4>{t("faq_question_2")}</h4>
                            <h3 className={`faq__icon ${openIndex === 1 ? "faq_open" : ""}`}> <RxCross1 /></h3>
                        
                        </div>
                        <div className={`faq__answer--wrapper ${openIndex === 1 ? "faq_open" : ""}`}>
                            <h4>{t("faq_answer_2")}</h4>
                            
                        
                        </div>
                    </div>
                    <div className='faq__card--wrapper'>

                        <div className='faq__question--wrapper' onClick={() => toggleFAQ(2)}>
                            <h4>{t("faq_question_3")}</h4>
                            <h3 className={`faq__icon ${openIndex === 2 ? "faq_open" : ""}`}> <RxCross1 /></h3>
                        
                        </div>
                        <div className={`faq__answer--wrapper ${openIndex === 2 ? "faq_open" : ""}`}>
                            <h4>{t("faq_answer_3")}</h4>
                            
                        
                        </div>
                    </div>
                    <div className='faq__card--wrapper'>

                        <div className='faq__question--wrapper' onClick={() => toggleFAQ(3)}>
                            <h4>{t("faq_question_4")}</h4>
                            <h3 className={`faq__icon ${openIndex === 3 ? "faq_open" : ""}`}> <RxCross1 /></h3>
                        
                        </div>
                        <div className={`faq__answer--wrapper ${openIndex === 3 ? "faq_open" : ""}`}>
                            <h4>{t("faq_answer_4")}</h4>
                            
                        
                        </div>
                    </div>
                    <div className='faq__card--wrapper'>

                        <div className='faq__question--wrapper' onClick={() => toggleFAQ(4)}>
                            <h4>{t("faq_question_5")}</h4>
                            <h3 className={`faq__icon ${openIndex === 4 ? "faq_open" : ""}`}> <RxCross1 /></h3>
                        
                        </div>
                        <div className={`faq__answer--wrapper ${openIndex === 4 ? "faq_open" : ""}`}>
                            <h4>{t("faq_answer_5")}</h4>
                            
                        
                        </div>
                    </div>
                    <div className='faq__card--wrapper'>

                        <div className='faq__question--wrapper' onClick={() => toggleFAQ(5)}>
                            <h4>{t("faq_question_6")}</h4>
                            <h3 className={`faq__icon ${openIndex === 5 ? "faq_open" : ""}`}> <RxCross1 /></h3>
                        
                        </div>
                        <div className={`faq__answer--wrapper ${openIndex === 5 ? "faq_open" : ""}`}>
                            <h4>{t("faq_answer_6")}</h4>
                            
                        
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default LandingFAQ;
