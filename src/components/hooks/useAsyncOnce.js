import { useCallback, useRef, useState } from 'react';

const createPromise = () => ({
  finished: false,
  cancelled: false,
  cancel() {
    if (this.finished) return;
    this.cancelled = true;
  },
  async run(callback, afterCallback) {
    const doneCallback = await callback();
    if (this.cancelled) return;

    if (typeof doneCallback === 'function') {
      doneCallback();
    }

    afterCallback();
  },
});

function useAsyncOnce() {
  const runningRef = useRef(false);
  const previousPromiseRef = useRef(null);
  const [running, setRunning] = useState(false);

  const asyncOnce = useCallback((callback, { override = false } = {}) => {
    if (runningRef.current) {
      if (!override) return;

      // leave this without ?.cancel,
      // so that it throws an error
      previousPromiseRef.current.cancel();
    }

    runningRef.current = true;
    setRunning(true);

    const promise = createPromise();
    promise.run(callback, () => {
      runningRef.current = false;
      setRunning(false);
    });

    previousPromiseRef.current = promise;
  }, []);

  return [asyncOnce, running];
}

export default useAsyncOnce;
