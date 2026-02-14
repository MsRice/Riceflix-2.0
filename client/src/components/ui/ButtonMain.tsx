import { Link } from "react-router-dom";
import type { ButtonProps } from "../../utils/types";


const ButtonMain = ({children , to , className} : ButtonProps) => {
    return(
        <Link to={to} className={className}>
            {children}
        </Link>
    )
}


export default ButtonMain;