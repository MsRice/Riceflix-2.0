import type { TrendingCardProps } from "../../utils/types";


const TrendingCard = ({index , movie}: TrendingCardProps) => {
    return (
        <div className="trending__card--wrapper"  id={String(movie.id)}>
           <div className="trending__cardImage--wrapper">
            {movie.backdrop_path &&
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="trending__cardImage--image" alt="" />
            }
            
            </div> 
            <div className="trending__cardNumber--wrapper">
            {index + 1}

            </div>
            
        </div>
    );
}

export default TrendingCard;
