import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import riceflix_logo  from '../../assets/images/Riceflix_Logos/Riceflix logo.png'
import { IoLanguageSharp, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import { TiArrowSortedDown } from 'react-icons/ti';
import { FaHandshake } from 'react-icons/fa';
import RiceCodes  from "../../assets/images/rice_codesLOGOS/Rice_logo_only_no_background.svg?react";
import { useLanguage } from '../../contexts/lang/LanguageContext';
import { useEffect, useMemo, useRef, useState } from 'react';
import ButtonMain from '../ui/ButtonMain';
import { RxCrossCircled } from 'react-icons/rx';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { useAuthentication } from '../../contexts/auth/AuthenticationContext';
import electronics from '../../assets/images/Netflix_assets/electronics.png';



const Registration = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { t } = useTranslation()
    const { register } = useAuthentication()
    const [error, setError] = useState<string | null>(null)

    const { language , setLanguage } = useLanguage()
    const [ openLangMenu , setOpenLangMenu ] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const [email , setEmail ] = useState(location.state?.email || '')
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type , setType] = useState('password')
     const [confType , setConfType] = useState('password')
    const [isValid, setIsValid] = useState<boolean>(false);
    const [learnOpen, setLearnOpen] = useState<boolean>(false);



    function validateEmail(value: string) {
    const trimmed = value.trim();
    if (!trimmed) {
      setIsValid(false);
      return;
    }

    const input = document.createElement("input");
    input.type = "email";
    input.value = trimmed;

    setIsValid(input.checkValidity());
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  }

    const passwordsMatch = useMemo(() => {
        if (!confirmPassword) return true;
        return password === confirmPassword;
    }, [password, confirmPassword]);

 const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const userData = { email ,password ,confirmPassword}
    
    setError(null)
  
    if(!passwordsMatch) {
        setError('Passwords do not match!')
        return
    }

    try {
               
            await register(userData)
            navigate('/')
        
        } catch (error: unknown) {
        if(error instanceof Error){

            setError(error.message)
        }else{
            setError('Something went wrong try again')
        }
        }
    
}

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
          <>
        
        <div className="registration__container">
            <nav className='navigation--wrapper'>
                <div className='navigation-title--wrapper'><Link to={'/'}><img className='navigation-logo' src={riceflix_logo} alt="Riceflix Logo" /></Link></div>
                <ButtonMain to='/login' className={'secondary-btn'}>{t('signin')}</ButtonMain>
            </nav>
            <div className='login__container--wrapper'>

          
            <div className='registration__signin--wrapper'>
                <div className="registration__image--wrapper">

                <img src={electronics} className="registration__image--img"  />
                </div>
                <h2>{t("finish_acct_setup")}</h2>
                <h4>{t("or_new_acct")}</h4>
                 <div className='header__form--wrapper'>

                <form className='hero__header--form login--form' onSubmit={handleForm}>
                  
                    <input id='email' type="text" value={email} onChange={handleChange} placeholder='Email address' />

                    <div className='input-wrapper'>
                        <input id='password' type={type} value={password} onChange={e => setPassword(e.target.value)} placeholder='password' />
                        <button 
                            type="button"
                            className='log-icon'
                            aria-label={type === 'password' ? 'Show password' : 'Hide password'} 
                            onClick={() => setType(type === 'password' ? 'text' : 'password') }>
                                {type === 'password' ? <LuEyeClosed /> :<LuEye /> }
                        </button>
                    </div>
                    <div className='input-wrapper'>
                        <input id='password' type={type} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='password' />
                        <button 
                            type="button"
                            className='log-icon'
                            aria-label={type === 'password' ? 'Show password' : 'Hide password'} 
                            onClick={() => setConfType(confType === 'password' ? 'text' : 'password') }>
                                {confType === 'password' ? <LuEyeClosed /> :<LuEye /> }
                        </button>
                    </div>
                    
                    <ButtonMain type='submit' className={'primary-btn login-started '}>{t('continue')}</ButtonMain>
                </form>
                {!isValid && email.length > 0 && (
                    <p style={{ color: "red" }}><RxCrossCircled />{t("valid_email")}</p>
                )}
               { error && <p style={{ color: "red" }}>{error}</p> }
                </div>
                
                <div className='repatcha--wrapper repatcha--registration '>
                    <p>{t("rePATCHA")} <b onClick={() => setLearnOpen(prev => !prev)} style={{ color: "grey" }}>{t("learn_more")}</b></p>
                    {learnOpen && <p>{t("rePATCHA_more")}</p>}
                </div>
                </div>
            </div>
        </div>
        <div className=' registration__footer--container'>
            <footer className='login__footer'>
                <div className="footer__header--wrapper">
                    <p>{t("questions")} <a href="tel:1-866-952-4456">1-866-952-4456</a> (Toll-Free)</p>
                </div>
                <div className="footer__links--wrapper">
                    <ul className="footer__links">
                        <li><a href="#">{t("footer_link_1")}</a></li>
                        <li><a href="#">{t("footer_link_4")}</a></li>
                        <li><a href="#">{t("footer_link_6")}</a></li>
                        <li><a href="#">{t("footer_link_7")}</a></li>
                        <li><a href="#">{t("footer_link_10")}</a></li>
                        <li><a href="#">{t("footer_link_15")}</a></li>
                        <li><a href="#">{t("footer_link_17")}</a></li>
                        <li><a href="#">{t("footer_link_18")}</a></li>
                        <li><a href="#">{t("footer_link_19")}</a></li>
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
                   
                </div>
                
            </footer>
        </div>            
    </>
    );
}

export default Registration;
