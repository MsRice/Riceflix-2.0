import { Link } from "react-router-dom";
import type { ButtonProps } from "../../utils/types";


const ButtonMain = ({children , to} : ButtonProps) => {
    return(
        <Link to={to} className='primary-btn'>
            {children}
        </Link>
    )
}


export default ButtonMain;