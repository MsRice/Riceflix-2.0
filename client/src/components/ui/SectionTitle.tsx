import type {SectionTitleProps } from "../../utils/types";


const SectionTitle = ({children , className} : SectionTitleProps) => {
    return(
        <div className={className}>
            {children}
        </div>
    )
}


export default SectionTitle;