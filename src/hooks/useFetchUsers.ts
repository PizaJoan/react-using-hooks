import { useEffect, useRef, useState } from "react";
import type { Result } from "../types";

const URL = "https://randomuser.me/api/?results=100";

export function useFetchUsers() {
  const [data, setData] = useState<Result[]>();
  const originalUsers = useRef<Result[]>([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        originalUsers.current = data.results;
      });
  }, [setData]);

  return {
    results: data,
    setResults: setData,
    originalUsers,
  };
}
