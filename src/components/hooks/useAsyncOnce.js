import { useCallback, useRef, useState } from 'react';

function useAsyncOnce() {
  const runningRef = useRef(false);
  const [running, setRunning] = useState(false);

  const asyncOnce = useCallback(async (callback) => {
    if (runningRef.current) return;

    runningRef.current = true;
    setRunning(true);

    await callback();

    runningRef.current = false;
    setRunning(false);
  }, []);

  return [asyncOnce, running];
}

export default useAsyncOnce;
