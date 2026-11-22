// Controlled component: the rating lives in App (keyed by movie id),
// so it survives filtering / "show more" and follows the right movie.
function StarRating({ value, onRate }) {
  return (
    <div className="rating">
      <span className="rating__label">הדירוג שלי:</span>
      <div className="rating__stars">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            className="rating__star"
            onClick={() => onRate(star)}
            aria-label={`${star} כוכבים`}
          >
            {star <= value ? "★" : "☆"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StarRating;
