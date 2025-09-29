import { useEffect, useState } from "react";
import type { Launch } from "../types";
import { formatDate } from "../utils/date";
import { useLaunches } from "../context/LaunchesContext";
import { MdOutlineStarBorder } from "react-icons/md";
import { fetchRocketName } from "../api/spacex";
import { IoIosStar } from "react-icons/io";
import Badge from "./Badge";

export default function LaunchCard({
  launch,
  onOpen,
}: {
  launch: Launch;
  onOpen: (l: Launch) => void;
}) {
  const { favorites, toggleFavorite } = useLaunches();
  const isFav = favorites.has(launch.id);
  const [rocketName, setRocketName] = useState<string | null>(null);

  const launchYear = new Date(launch.date_utc).getUTCFullYear();
  useEffect(() => {
    if (!launch) return;
    let mounted = true;
    fetchRocketName(launch.rocket).then((n) => mounted && setRocketName(n));
    return () => {
      mounted = false;
    };
  }, [launch]);

  return (
    <div
      className="p-4 bg-white rounded-xl  flex flex-col gap-4 shadow hover:shadow-md transition-shadow"
      aria-labelledby={`launch-${launch.id}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 id={`launch-${launch.id}`} className="font-semibold text-lg mb-1">
            {launch.name}
          </h3>
          <div className="text-sm text-gray-500">
            {formatDate(launch.date_utc)} • {rocketName ?? "Loading..."}
          </div>
        </div>

        <button
          aria-pressed={isFav}
          aria-label={isFav ? "Remove favorite" : "Add favorite"}
          onClick={() => toggleFavorite(launch.id)}
          className={`flex items-center gap-1 cursor-pointer px-3 py-1.5 rounded-full border text-sm ${
            isFav
              ? "border-green-400 text-green-600 bg-green-50"
              : "border-slate-300 text-slate-600 hover:bg-slate-50"
          }`}
        >
          {isFav ? (
            <IoIosStar className="w-4 h-4" />
          ) : (
            <MdOutlineStarBorder className="w-4 h-4" />
          )}
          Favorite
        </button>
      </div>

      <div className="flex gap-2">
        <Badge color={launch.success === null
              ? "slate"
              : launch.success
              ? "blue"
              : "slate"
          }
        >
          {launch.success === null
            ? "TBD"
            : launch.success
            ? "Success"
            : "Failure"}
        </Badge>
        <Badge color="blue">{launchYear}</Badge>
      </div>

      <div className="flex text-blue-500 items-center justify-end gap-1 text-sm">
        <button
          onClick={() => onOpen(launch)}
          className="cursor-pointer font-medium "
        >
          View details
        </button>
      </div>
    </div>
  );
}
