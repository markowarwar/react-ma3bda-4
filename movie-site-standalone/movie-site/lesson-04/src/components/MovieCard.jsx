import { useState } from "react";
import StarRating from "./StarRating.jsx";
import "./MovieCard.css";

function MovieCard({
  title, year, duration, genre, rating, poster, available,
  myRating, onRate
}) {
  const [liked, setLiked] = useState(false);

  return (
    <article className={available ? "movie-card" : "movie-card movie-card--unavailable"}>
      <div className="movie-card__poster">{poster}</div>
      <div className="movie-card__body">
        <div className="movie-card__top">
          <h3 className="movie-card__title">{title}</h3>
          <button className="movie-card__heart" onClick={() => setLiked(!liked)}>
            {liked ? "♥" : "♡"}
          </button>
        </div>
        <p className="movie-card__meta">{year} · {duration} דק׳</p>
        <p className="movie-card__meta">{genre} · ⭐ {rating}</p>
        <StarRating value={myRating} onRate={onRate} />
        {!available && <p className="movie-card__meta">לא זמין לצפייה</p>}
      </div>
    </article>
  );
}

export default MovieCard;
