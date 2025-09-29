import { useEffect, useRef, useState } from "react";
import type { Launch } from "../types";
import { fetchRocketName } from "../api/spacex";
import { formatDate } from "../utils/date";

export default function LaunchDetailsModal({
  launch,
  onClose,
}: {
  launch: Launch | null;
  onClose: () => void;
}) {

  
  if (!launch) return null;

  const [rocketName, setRocketName] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!launch) return;
    let mounted = true;
    fetchRocketName(launch.rocket).then((n) => mounted && setRocketName(n));
    return () => {
      mounted = false;
    };
  }, [launch]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!launch) return null;


  return (
   <>
     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"        
        aria-modal="true"
        className="relative max-w-5xl w-full  bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-5 cursor-pointer right-4 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3">

          <div className="p-6 flex flex-col items-center border-b md:border-b-0 md:border-r bg-slate-50">
            {launch.links.patch.small ? (
              <img
                src={launch.links.patch.small}
                alt="mission patch"
                className="w-40 h-40 object-contain bg-white rounded-lg shadow"
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center rounded-lg bg-slate-200 text-slate-500 text-sm">
                No image available
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 w-full">
              {launch.links.wikipedia && (
                <a
                  href={launch.links.wikipedia}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium  transition"
                >
                  Wikipedia
                </a>
              )}

              {launch.links.webcast ? (
                <button
                  onClick={() =>
                    window.open(
                      launch.links.webcast ?? undefined,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="w-full px-4 py-2 rounded-lg bg-red-500 text-white text-sm cursor-pointer font-medium transition"
                >
                  Webcast
                </button>
              ) : (
                <span className="text-sm text-slate-400 text-center">
                  No webcast available
                </span>
              )}
            </div>
          </div>


          <div className="p-6 md:col-span-2 flex flex-col">
            <h2 className="text-2xl font-bold">{launch.name}</h2>
            <p className="text-sm text-slate-500 mt-1">
              {formatDate(launch.date_utc)} • Rocket:{" "}
              {rocketName ?? "Loading..."}
            </p>

            <div className="mt-4">
              <div className="font-semibold text-xl">Details</div>
              <div className="mt-2 text-sm text-justify justify-between text-slate-700 leading-relaxed ">
                {launch.details ?? "No details provided for this launch."}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
   </>
  );
}
