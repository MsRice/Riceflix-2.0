import { Link } from "react-router-dom";
import type { ButtonProps } from "../../utils/types";


const ButtonMain = ({children , to , className ,type='button' , ...rest} : ButtonProps) => {
    if (to){

        return(
            <Link to={to} className={className}>
                {children}
            </Link>
        )
    }

    return(
        <button type={type} className={className} {...rest}>
            {children}
        </button>
    )
}


export default ButtonMain;