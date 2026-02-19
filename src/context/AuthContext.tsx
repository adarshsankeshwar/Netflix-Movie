import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("netflix_session");
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch {
        localStorage.removeItem("netflix_session");
      }
    }
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    const users: StoredUser[] = JSON.parse(localStorage.getItem("netflix_users") || "[]");
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already registered" };
    }
    users.push({ name, email, password });
    localStorage.setItem("netflix_users", JSON.stringify(users));
    const userData = { name, email };
    localStorage.setItem("netflix_session", JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users: StoredUser[] = JSON.parse(localStorage.getItem("netflix_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { success: false, error: "Invalid email or password" };
    }
    const userData = { name: found.name, email: found.email };
    localStorage.setItem("netflix_session", JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("netflix_session");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
