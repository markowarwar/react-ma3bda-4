import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MovieList from "./components/MovieList.jsx";
import { movies } from "./data/movies.js";

const PAGE_SIZE = 4;

function App() {
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Personal ratings, keyed by movie id: { 1: 3, 4: 5 }
  const [ratings, setRatings] = useState({});

  const topRated = movies.filter(movie => movie.rating >= 8.7);

  // Unique genres, computed from the data
  const genres = movies
    .map(movie => movie.genre)
    .filter((genre, index, all) => all.indexOf(genre) === index);

  // Two filters working together
  let shownMovies = movies;
  if (onlyAvailable) {
    shownMovies = shownMovies.filter(movie => movie.available);
  }
  if (selectedGenre !== "all") {
    shownMovies = shownMovies.filter(movie => movie.genre === selectedGenre);
  }

  const visibleMovies = shownMovies.slice(0, visibleCount);

  function toggleAvailable() {
    setOnlyAvailable(!onlyAvailable);
    setVisibleCount(PAGE_SIZE);
  }

  // Bonus-to-bonus: two setters in one function, so the list resets to 4
  function selectGenre(genre) {
    setSelectedGenre(genre);
    setVisibleCount(PAGE_SIZE);
  }

  function rateMovie(movieId, star) {
    const current = ratings[movieId] ?? 0;
    // Clicking the same star again resets to 0
    setRatings({ ...ratings, [movieId]: current === star ? 0 : star });
  }

  function showMore() {
    setVisibleCount(visibleCount + PAGE_SIZE);
  }

  return (
    <>
      <Header />
      <main className="page container">
        <section className="page__intro">
          <h1>הקטלוג</h1>
          <p>סרטים שכדאי לראות — הישנים הטובים והחדשים.</p>
        </section>

        <MovieList
          title="הכי מדורגים"
          movies={topRated}
          ratings={ratings}
          onRate={rateMovie}
        />

        <div className="toolbar">
          <button
            className={onlyAvailable ? "btn btn--active" : "btn"}
            onClick={toggleAvailable}
          >
            רק זמינים לצפייה
          </button>

          <span className="toolbar__divider"></span>

          <button
            className={selectedGenre === "all" ? "btn btn--active" : "btn"}
            onClick={() => selectGenre("all")}
          >
            הכל
          </button>
          {genres.map(genre => (
            <button
              key={genre}
              className={selectedGenre === genre ? "btn btn--active" : "btn"}
              onClick={() => selectGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>

        <MovieList
          title={`כל הסרטים (${shownMovies.length})`}
          movies={visibleMovies}
          ratings={ratings}
          onRate={rateMovie}
        />

        {visibleCount < shownMovies.length && (
          <div className="more">
            <button className="btn" onClick={showMore}>
              הצג עוד
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
