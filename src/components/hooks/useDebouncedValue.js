import { useRef, useState } from 'react';

const createDebouncer = () => ({
  finished: false,
  cancelled: false,
  cancel() {
    if (this.finished) return;
    this.cancelled = true;
  },
  async run(callback) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (this.cancelled) return;

    callback();
  },
});

const useDebouncedValue = (value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const ref = useRef({
    debouncer: null,
    debounce(value) {
      this.debouncer?.cancel();

      this.debouncer = createDebouncer();
      this.debouncer.run(() => {
        setDebouncedValue(value);
      });
    },
  });

  ref.current.debounce(value);
  return debouncedValue;
};

export default useDebouncedValue;
