import { useEffect, useState } from "react";
import { ApiResponse, Restaurant } from "../types/restaurant";

const URL =
  "https://storage.googleapis.com/nandos-engineering-public/coding-challenge-rn/restaurantlist.json";

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Failed to fetch restaurants");

        const json: ApiResponse = await response.json();
        setRestaurants(json.data.restaurant.items);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants, isLoading, error };
}
