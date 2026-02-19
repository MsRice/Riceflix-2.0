import { useTranslation } from 'react-i18next';
import riceflix_logo  from '../../assets/images/Riceflix_Logos/Riceflix logo.png'
import { IoLanguageSharp, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import { TiArrowSortedDown } from 'react-icons/ti';
import { FaHandshake } from 'react-icons/fa';
import RiceCodes  from "../../assets/images/rice_codesLOGOS/Rice_logo_only_no_background.svg?react";
import { useLanguage } from '../../contexts/lang/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import ButtonMain from '../ui/ButtonMain';
import { MdKeyboardArrowDown} from 'react-icons/md';
import { RxCrossCircled } from 'react-icons/rx';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { useAuthentication } from '../../contexts/auth/AuthenticationContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { t } = useTranslation()
    const { login } = useAuthentication()
    const [error, setError] = useState<string | null>(null)

    const { language , setLanguage } = useLanguage()
    const [ openLangMenu , setOpenLangMenu ] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type , setType] = useState('password')
    const [isValid, setIsValid] = useState<boolean>(false);
    const [learnOpen, setLearnOpen] = useState<boolean>(false);

      const navigate = useNavigate()

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

const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const userData = { email ,password }

    
    try {
        console.log('mlb')
        await login(userData)
        navigate('/')
    } catch (error) {
        setError((error as Error).message)
    }
    
    
}

function togglePass(){
    setType(
        type === 'password' ? 'text' : 'password'
    ) 
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
        
        <div className="container login__container">
            <nav className='navigation--wrapper'>
                <div className='navigation-title--wrapper'><Link to={'/'}><img className='navigation-logo' src={riceflix_logo} alt="Riceflix Logo" /></Link></div>

            </nav>
            <div className='login__container--wrapper'>

          
            <div className='login__signin--wrapper'>
                <h2>{t("enter_info")}</h2>
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
                            onClick={togglePass}>
                                {type === 'password' ? <LuEyeClosed /> :<LuEye /> }
                        </button>
                    </div>
                    
                    <ButtonMain type='submit' className={'primary-btn login-started '}>{t('continue')}</ButtonMain>
                </form>
                {!isValid && email.length > 0 && (
                    <p style={{ color: "red" }}><RxCrossCircled />Please enter a valid email</p>
                )}
               { error && <p>{error}</p> }
                </div>
                <div className='get__help--wrapper'>
                    <h4>{t("get_help" )}<MdKeyboardArrowDown/></h4>
                </div>
                <div className='repatcha--wrapper'>
                    <p>{t("rePATCHA")} <b onClick={() => setLearnOpen(prev => !prev)}>{t("learn_more")}</b></p>
                    {learnOpen && <p>{t("rePATCHA_more")}</p>}
                </div>
                </div>
            </div>
        </div>
        <div className=' login__footer--container'>
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

export default Login;
