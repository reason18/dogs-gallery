import { useCallback, useEffect, useRef, useState } from "react";

// Type for the hook's return value
interface UseApiDataReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Helper function to safely extract error message
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "An unknown error occurred";
};

// Main hook with TypeScript generics
export function useApiData<T = object>(url: string): UseApiDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const ignoreRef = useRef<boolean>(false);

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      // Reset ignore flag for new request
      ignoreRef.current = false;

      setLoading(true);
      setError(null);

      const response: Response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: T = await response.json();

      // Only update state if request hasn't been ignored
      if (!ignoreRef.current) {
        setData(result);
      }
    } catch (err: unknown) {
      if (!ignoreRef.current) {
        setError(getErrorMessage(err));
      }
    } finally {
      if (!ignoreRef.current) {
        setLoading(false);
      }
    }
  }, [url]);

  useEffect(() => {
    fetchData();

    // Cleanup function to ignore the current request
    return () => {
      ignoreRef.current = true;
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
