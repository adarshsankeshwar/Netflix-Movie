import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";
import MovieCard from "@/components/MovieCard";
import { MovieRowSkeleton } from "@/components/MovieCardSkeleton";
import { searchMovies, MOVIE_CATEGORIES, type Movie } from "@/services/omdbService";

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (!searchQuery) return;
    setSearchLoading(true);
    setSearchError("");
    searchMovies(searchQuery)
      .then((res) => {
        if (res.Response === "True") {
          setSearchResults(res.Search);
        } else {
          setSearchError(res.Error || "No results found");
          setSearchResults([]);
        }
      })
      .catch(() => setSearchError("Search failed"))
      .finally(() => setSearchLoading(false));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {searchQuery ? (
        <div className="pt-24 px-4 md:px-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Results for "{searchQuery}"
          </h2>
          {searchLoading && <MovieRowSkeleton />}
          {searchError && (
            <p className="text-muted-foreground">{searchError}</p>
          )}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {searchResults.map((movie) => (
              <div key={movie.imdbID} className="w-full">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <HeroBanner />
          <div className="-mt-32 relative z-10">
            {MOVIE_CATEGORIES.map((cat) => (
              <MovieRow key={cat.query} title={cat.title} query={cat.query} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
