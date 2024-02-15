import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const setAfterDelay = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(setAfterDelay);
    };
  }, [delay, value]);

  return debouncedValue;
};
