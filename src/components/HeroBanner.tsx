import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import { searchMovies, type Movie } from "@/services/omdbService";
import heroBg from "@/assets/hero-bg.jpg";

const HeroBanner = () => {
  const [featured, setFeatured] = useState<Movie | null>(null);

  useEffect(() => {
    searchMovies("dark knight").then((res) => {
      if (res.Response === "True" && res.Search.length > 0) {
        setFeatured(res.Search[0]);
      }
    });
  }, []);

  return (
    <div className="relative h-[85vh] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="netflix-gradient absolute inset-0" />
      <div className="netflix-gradient-left absolute inset-0" />

      <div className="relative z-10 flex flex-col justify-end h-full pb-32 px-4 md:px-12">
        <div className="max-w-lg animate-fade-in-up">
          <h1 className="font-display text-5xl md:text-7xl text-foreground tracking-wide mb-4">
            {featured?.Title || "NETFLUX ORIGINALS"}
          </h1>
          <p className="text-sm md:text-base text-secondary-foreground mb-6 line-clamp-3">
            Discover thousands of movies and shows. Stream your favorites anytime, anywhere.
          </p>
          <div className="flex gap-3">
            {featured && (
              <Link
                to={`/movie/${featured.imdbID}`}
                className="btn-netflix-lg flex items-center gap-2"
              >
                <Play size={20} fill="currentColor" /> Play
              </Link>
            )}
            <Link
              to={featured ? `/movie/${featured.imdbID}` : "#"}
              className="flex items-center gap-2 bg-secondary/80 text-foreground font-semibold px-6 py-3 rounded hover:bg-secondary transition-colors text-lg"
            >
              <Info size={20} /> More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
