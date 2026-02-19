import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Landing = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/70" />

      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 md:px-12 py-5 z-20">
        <span className="font-display text-4xl md:text-5xl text-primary tracking-wider">
          NETFLUX
        </span>
        <Link to="/login" className="btn-netflix">
          Sign In
        </Link>
      </nav>

      <div className="relative z-10 text-center max-w-2xl px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-lg md:text-xl text-secondary-foreground mb-8">
          Watch anywhere. Cancel anytime.
        </p>
        <p className="text-base text-secondary-foreground mb-6">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/signup" className="btn-netflix-lg text-xl px-10">
            Get Started &rsaquo;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
