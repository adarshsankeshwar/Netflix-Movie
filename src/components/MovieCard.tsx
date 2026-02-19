import { Link } from "react-router-dom";
import type { Movie } from "@/services/omdbService";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const hasImage = movie.Poster && movie.Poster !== "N/A";

  return (
    <Link to={`/movie/${movie.imdbID}`} className="block flex-shrink-0 w-[140px] md:w-[180px]">
      <div className="movie-card-hover rounded overflow-hidden bg-card cursor-pointer group">
        <div className="aspect-[2/3] overflow-hidden">
          {hasImage ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs p-2 text-center">
              {movie.Title}
            </div>
          )}
        </div>
        <div className="p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs text-foreground font-medium truncate">{movie.Title}</p>
          <p className="text-xs text-muted-foreground">{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
