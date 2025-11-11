import React from "react";

export const SelectInput = ({
  id,
  name,
  value,
  onChange,
  label,
  error,
  options,
  defaultOption
}) => {
  return (
    <div className="input-container">
      <label htmlFor="category">{label}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        {defaultOption && (<option hidden>{defaultOption}</option>)}
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="error">{error}</p>
    </div>
  );
};
