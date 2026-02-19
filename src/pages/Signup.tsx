import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    const result = signup(name, email, password);
    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute top-5 left-4 md:left-12">
        <Link to="/" className="font-display text-4xl text-primary tracking-wider">
          NETFLUX
        </Link>
      </div>

      <div className="w-full max-w-md bg-card/90 rounded-lg p-8 md:p-14 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8">Sign Up</h1>

        {error && (
          <div className="bg-primary/20 border border-primary rounded px-4 py-3 mb-4 text-sm text-primary">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <button type="submit" className="btn-netflix w-full py-3 text-base">
            Sign Up
          </button>
        </form>

        <p className="text-muted-foreground text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-foreground hover:underline">
            Sign in now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
