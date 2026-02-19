import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Search, LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useState(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/home?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-3 transition-colors duration-300 ${
        scrolled ? "bg-background" : "navbar-gradient"
      }`}
    >
      <Link to="/home" className="font-display text-3xl md:text-4xl text-primary tracking-wider">
        NETFLUX
      </Link>

      <div className="flex items-center gap-4">
        {searchOpen ? (
          <form onSubmit={handleSearch} className="flex items-center animate-fade-in">
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Titles, people, genres"
              className="auth-input w-48 md:w-64 text-sm py-1.5"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </form>
        ) : (
          <button onClick={() => setSearchOpen(true)} className="text-foreground hover:text-primary transition-colors">
            <Search size={20} />
          </button>
        )}

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-sm text-secondary-foreground">
            <User size={16} />
            <span>{user?.name}</span>
          </div>
          <button onClick={logout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut size={16} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
