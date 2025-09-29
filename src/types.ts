export type Launch = {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  details: string | null;
  links: {
    patch: { small: string | null; large: string | null };
    webcast: string | null;
    wikipedia: string | null;
  };
  rocket: string;
};

export type  ContextType = {
  launches: Launch[];
  filtered: Launch[];
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  year: string | null;
  setYear: (y: string | null) => void;
  successOnly: boolean;
  setSuccessOnly: (b: boolean) => void;
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (b: boolean) => void;
};