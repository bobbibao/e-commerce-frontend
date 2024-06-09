import React, { useState } from 'react';

const FormInput = ({ label, name, type, defaultValue, size }) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

    return (
      <div className='form-control'>
        <label htmlFor={name} className='label'>
          <span className='label-text capitalize'>{label}</span>
        </label>
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          className={`input input-bordered ${size}`}
          placeholder="Tìm kiếm..."
          onFocus={onFocus}
          onBlur={onBlur}
          style={isFocused ? { borderColor: 'rgb(240, 185, 11)' } : {}}
        />
      </div>
    );
  };
  export default FormInput;