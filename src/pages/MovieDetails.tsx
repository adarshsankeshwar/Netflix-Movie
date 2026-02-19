import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { getMovieDetails, type MovieDetails as MovieDetailsType } from "@/services/omdbService";
import Navbar from "@/components/Navbar";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getMovieDetails(id)
      .then((data) => {
        if (data.Title) {
          setMovie(data);
        } else {
          setError("Movie not found");
        }
      })
      .catch(() => setError("Failed to load movie details"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 px-4 md:px-12">
          <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
            <div className="w-64 h-96 skeleton-pulse flex-shrink-0" />
            <div className="flex-1 space-y-4">
              <div className="h-10 w-3/4 skeleton-pulse" />
              <div className="h-4 w-1/2 skeleton-pulse" />
              <div className="h-24 w-full skeleton-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">{error || "Movie not found"}</p>
          <button onClick={() => navigate(-1)} className="btn-netflix">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const hasImage = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-4 md:px-12 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto animate-fade-in">
          <div className="flex-shrink-0 w-full md:w-72">
            {hasImage ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full rounded-lg shadow-2xl"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-card rounded-lg flex items-center justify-center text-muted-foreground">
                No Poster
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {movie.Title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-muted-foreground">
              <span>{movie.Year}</span>
              <span>•</span>
              <span>{movie.Rated}</span>
              <span>•</span>
              <span>{movie.Runtime}</span>
            </div>

            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <div className="flex items-center gap-2 mb-6">
                <Star size={20} className="text-primary fill-primary" />
                <span className="text-lg font-semibold text-foreground">
                  {movie.imdbRating}
                </span>
                <span className="text-sm text-muted-foreground">/ 10</span>
              </div>
            )}

            <p className="text-secondary-foreground leading-relaxed mb-6">
              {movie.Plot}
            </p>

            <div className="space-y-3 text-sm">
              {[
                ["Genre", movie.Genre],
                ["Director", movie.Director],
                ["Cast", movie.Actors],
                ["Language", movie.Language],
                ["Awards", movie.Awards],
                ["Box Office", movie.BoxOffice],
              ]
                .filter(([, val]) => val && val !== "N/A")
                .map(([label, val]) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-muted-foreground w-24 flex-shrink-0">{label}</span>
                    <span className="text-foreground">{val}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
