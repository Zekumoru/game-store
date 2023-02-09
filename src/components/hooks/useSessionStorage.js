import { useEffect, useState } from 'react';

function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const obj = JSON.parse(sessionStorage.getItem(key));
    if (obj != null) return obj;
    if (typeof initialValue === 'function') return initialValue();
    return initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useSessionStorage;
