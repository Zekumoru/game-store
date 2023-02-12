import React, { useEffect, useRef, useState } from 'react';

function Form({ children, className, onSubmit }) {
  const [mounted, setMounted] = useState(false); // used to prevent handleInvalid being called on mount
  const startsRef = useRef({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') onSubmit(e);
  };

  const handleInvalid = (e) => {
    if (mounted && !startsRef.current[e.target.id] && e.target.value === '') {
      startsRef.current[e.target.id] = true;
      e.target.classList.add('validate');
      e.target.reportValidity(); // this will lead to recursive
      // calls and throw stack overflow error hence we needed
      // the startsRef
    }

    e.preventDefault();
  };

  return (
    <form
      className={className}
      onSubmit={handleSubmit}
      onInvalid={handleInvalid}
      data-testid="form"
    >
      {children}
    </form>
  );
}

export default Form;
