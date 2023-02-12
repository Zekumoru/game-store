import React, { useId } from 'react';
import useConstraintValidation from '../hooks/useConstraintValidation';

function LabelInput({
  label,
  validate,
  onChange,
  requiredMessage = '',
  className = '',
  ...inputProps
}) {
  const id = useId();
  const [data, handlers] = useConstraintValidation({
    validate,
    requiredMessage,
  });

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        ref={data.inputRef}
        id={id}
        className={`${className} ${data.aggressive ? 'validate' : ''}`}
        value={data.value}
        onChange={(e) => {
          handlers.change(e);
          if (typeof onChange === 'function') onChange(e);
        }}
        onInvalid={handlers.invalid}
        onBlur={handlers.blur}
        required={requiredMessage !== ''}
      />
      <div className="error-message">{data.errorMessage}</div>
    </div>
  );
}

export default LabelInput;
