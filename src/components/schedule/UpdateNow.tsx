"use client";
import { useEffect, useState } from "react";

export default function useNow(tickMs = 30_000) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), tickMs);
    return () => clearInterval(id);
  }, [tickMs]);

  return now;
}
