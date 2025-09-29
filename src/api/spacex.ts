import axios from "axios";
import type { Launch } from "../types";

export async function fetchLaunches(): Promise<Launch[]> {
  try {
    const res = await axios.get("https://api.spacexdata.com/v4/launches");
    const data = res.data as any[];

    return data.map((d) => ({
      id: d.id,
      name: d.name,
      date_utc: d.date_utc,
      success: d.success,
      details: d.details,
      links: {
        patch: {
          small: d.links?.patch?.small ?? null,
          large: d.links?.patch?.large ?? null,
        },
        webcast: d.links?.webcast ?? null,
        wikipedia: d.links?.wikipedia ?? null,
      },
      rocket: d.rocket,
    }));
  } catch (error) {
    console.error("Failed to fetch launches:", error);
    throw new Error("Failed to fetch launches");
  }
}

export async function fetchRocketName(rocketId: string): Promise<string | null> {
  if (!rocketId) return null;

  try {
    const res = await axios.get(`https://api.spacexdata.com/v4/rockets/${rocketId}`);
    return res.data?.name ?? null;
  } catch (error) {
    console.error("Failed to fetch rocket name:", error);
    return null;
  }
}