import { vi } from "vitest";
import axios from "axios";

export const launchesMock = [
  {
    id: "1",
    name: "FalconSat",
    date_utc: "2006-03-24T22:30:00.000Z",
    rocket: "falcon1",
    success: false,
    details: "Engine failure at 33 seconds and loss of vehicle",
    links: {
      patch: {
        small: "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
        large: "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
      },
      webcast: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
      wikipedia: "https://en.wikipedia.org/wiki/DemoSat",
    },
  },
  {
    id: "2",
    name: "DemoSat",
    date_utc: "2007-03-21T01:10:00.000Z",
    success: false,
    details: "Second launch",
    links: {
      patch: { small: null, large: null },
      webcast: null,
      wikipedia: null,
    },
    rocket: "falcon1",
  },
  {
    id: "3",
    name: "Trailblazer",
    date_utc: "2008-08-03T03:34:00.000Z",
    success: true,
    details: "Successful launch",
    links: {
      patch: { small: null, large: null },
      webcast: null,
      wikipedia: null,
    },
    rocket: "falcon1",
  },
];

export const setupLocalStorageMock = () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    };
  })();
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
};

export const setupFetchMock = () => {
  
  vi.spyOn(axios, "get").mockImplementation((url: string) => {
    if (url.includes("launches")) {
      return Promise.resolve({ data: launchesMock });
    }
    if (url.includes("rockets")) {
      return Promise.resolve({ data: { name: "Falcon 1" } });
    }
    return Promise.reject(new Error(`Unknown endpoint: ${url}`));
  });
};

export const cleanupMocks = () => {
  vi.restoreAllMocks();
  window.localStorage.clear();
};