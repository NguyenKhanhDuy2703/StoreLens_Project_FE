// src/hooks/useBackgroundSync.js
import { useState, useEffect, useRef } from "react";

const useBackgroundSync = (syncFunction, intervalSeconds = 60) => {
  const [hasNewData, setHasNewData] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const runSync = async () => {
      try {
        setIsSyncing(true);
        await syncFunction();
        setHasNewData(true);
      } catch (error) {
        console.error("Auto sync failed:", error);
      } finally {
        setIsSyncing(false);
      }
    };

    timerRef.current = setInterval(runSync, intervalSeconds * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [syncFunction, intervalSeconds]);

  const confirmReload = () => {
    setHasNewData(false);
  };

  return { hasNewData, isSyncing, confirmReload };
};

export default useBackgroundSync;