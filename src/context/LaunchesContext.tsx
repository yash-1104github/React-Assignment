import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Launch, ContextType } from "../types";
import { fetchLaunches } from "../api/spacex";
import useLocalStorage from "../hooks/useLocalStorage";

const LaunchesContext = createContext<ContextType | undefined>(undefined);

export const LaunchesProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState<string | null>(null);
  const [successOnly, setSuccessOnly] = useState(false);
  const [favoritesArr, setFavoritesArr] = useLocalStorage<string[]>("favorites",[]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {

    let mounted = true;
    setLoading(true);

    fetchLaunches().then((data) => {
        if (!mounted) return;
        setLaunches(data.sort((a, b) => +new Date(b.date_utc) - +new Date(a.date_utc)));
     }).catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to load");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const favorites = useMemo(() => new Set(favoritesArr), [favoritesArr]);

  const toggleFavorite = (id: string) => {
    setFavoritesArr((prev) => {
      const set = new Set(prev);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return Array.from(set);
    });
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return launches.filter((l) => {
      if (showFavoritesOnly && !favorites.has(l.id)) return false;
      if (successOnly && l.success !== true) return false;
      if (year) {
        const y = new Date(l.date_utc).getUTCFullYear().toString();
        if (y !== year) return false;
      }
      if (q && !l.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [launches, search, year, successOnly, favorites, showFavoritesOnly]);

  const value: ContextType = {
    launches,
    filtered,
    loading,
    error,
    search,
    setSearch,
    year,
    setYear,
    successOnly,
    setSuccessOnly,
    favorites,
    toggleFavorite,
    showFavoritesOnly,
    setShowFavoritesOnly,
  };

  return (
    <LaunchesContext.Provider value={value}>
      {children}
    </LaunchesContext.Provider>
  );
};

export const useLaunches = () => {
  const ctx = useContext(LaunchesContext);
  if (!ctx) throw new Error("useLaunches must be used within LaunchesProvider");
  return ctx;
};