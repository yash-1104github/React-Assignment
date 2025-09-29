import { useMemo, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { useLaunches } from "../context/LaunchesContext";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { IoClose } from "react-icons/io5";


export default function Filters() {
  const {
    launches,
    search,
    setSearch,
    year,
    setYear,
    successOnly,
    setSuccessOnly,
    favorites,
    showFavoritesOnly,
    setShowFavoritesOnly,
  } = useLaunches();

  console.log(favorites)

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
  setSearch(debouncedSearch);
}, [debouncedSearch, setSearch]);


  const years = useMemo(() => {
    const set = new Set<string>();
    launches.forEach((l: any) =>
      set.add(new Date(l.date_utc).getUTCFullYear().toString())
    );
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [launches]);

  return (
    <div className="py-4 rounded-xl px-2  flex flex-col md:flex-row md:items-center gap-4">

      <div className="flex-1 relative">
        <Label htmlFor="search" className="text-base font-medium text-gray-600 ml-1">
          Search by mission name
        </Label>
        <Input
          id="search"
          placeholder="e.g., Starlink, CRS, Demo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-1 pr-10"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute top-1/2 right-3 -translate-y cursor-pointer text-gray-600"
          >
            <IoClose className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="flex md:items-center gap-4 justify-between  md:gap-6">

      <div className="w-40">
        <Label htmlFor="year" className="text-base font-medium text-gray-600 ml-1">
          Year
        </Label>
        <Select
          value={year ?? "all"}
          onValueChange={(val) => setYear(val === "all" ? null : val)}
        >
          <SelectTrigger id="year" className="mt-1">
            <SelectValue placeholder="All years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All years</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      <div className="flex items-center gap-4 md:gap-6 mt-6">
      
        <div className="flex items-center space-x-2 ">
          <Switch
            id="successOnly"
            checked={successOnly}
            className="cursor-pointer"
            onCheckedChange={setSuccessOnly}
          />
          <Label htmlFor="successOnly" className="text-base font-medium text-gray-600"> 
            Successful <span className="hidden md:block">only </span> 
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="favoritesOnly"
            checked={showFavoritesOnly}
            className="cursor-pointer"
            onCheckedChange={setShowFavoritesOnly}
          />
          <Label htmlFor="favoritesOnly" className="text-base font-medium text-gray-600">
            Favorites <span className="hidden md:block">only ({favorites.size})</span> 
          </Label>
        </div>

      </div>

      </div>

    </div>
  );
}
