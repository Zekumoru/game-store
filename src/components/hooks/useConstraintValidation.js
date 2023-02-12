import { useEffect, useRef, useState } from 'react';

function useConstraintValidation({ validate, requiredMessage }) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [aggressive, setAggressive] = useState(false);
  const inputRef = useRef(null);

  const handlers = {};

  handlers.change = (e) => {
    setValue(e.target.value);
    setErrorMessage('');

    if (typeof validate === 'function') {
      e.target.setCustomValidity(validate(e.target.value));
    }

    e.target.reportValidity();
  };

  handlers.invalid = (e) => {
    if (!e.target.classList.contains('validate')) return;
    setErrorMessage(
      e.target.value === '' ? requiredMessage : e.target.validationMessage
    );
  };

  handlers.blur = () => {
    if (!aggressive || requiredMessage !== '') {
      setAggressive(true);
    }
  };

  useEffect(() => {
    inputRef.current.reportValidity();
  }, [aggressive]);

  return [
    {
      value,
      errorMessage,
      inputRef,
      aggressive,
    },
    handlers,
  ];
}

export default useConstraintValidation;
