import type { TrendingCardProps } from "../../utils/types";


const TrendingCard = (movie: TrendingCardProps) => {
    return (
        <div className="trending__card--wrapper" id={String(movie.id)}>{movie.title || movie.name}</div>
    );
}

export default TrendingCard;
