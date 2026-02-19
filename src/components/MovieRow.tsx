import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { searchMovies, type Movie } from "@/services/omdbService";
import MovieCard from "./MovieCard";
import { MovieRowSkeleton } from "./MovieCardSkeleton";

interface MovieRowProps {
  title: string;
  query: string;
}

const MovieRow = ({ title, query }: MovieRowProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    searchMovies(query)
      .then((res) => {
        if (res.Response === "True") {
          setMovies(res.Search);
        } else {
          setError(res.Error || "No results found");
        }
      })
      .catch(() => setError("Failed to load movies"))
      .finally(() => setLoading(false));
  }, [query]);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const amount = dir === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  if (loading) return <MovieRowSkeleton />;
  if (error || movies.length === 0) return null;

  return (
    <div className="mb-8 px-4 md:px-12 group/row animate-fade-in">
      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-background/60 opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronLeft className="text-foreground" />
        </button>
        <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-background/60 opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronRight className="text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
