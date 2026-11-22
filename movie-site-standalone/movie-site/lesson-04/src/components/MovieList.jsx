import MovieCard from "./MovieCard.jsx";
import "./MovieList.css";

function MovieList({ title, movies, ratings = {}, onRate = () => {} }) {
  return (
    <section className="movie-list">
      <h2 className="movie-list__title">{title}</h2>
      {movies.length === 0 && (
        <p className="movie-list__empty">לא נמצאו סרטים</p>
      )}
      <div className="movie-list__grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            year={movie.year}
            duration={movie.duration}
            genre={movie.genre}
            rating={movie.rating}
            poster={movie.poster}
            available={movie.available}
            myRating={ratings[movie.id] ?? 0}
            onRate={star => onRate(movie.id, star)}
          />
        ))}
      </div>
    </section>
  );
}

export default MovieList;
