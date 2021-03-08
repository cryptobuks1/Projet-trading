// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

// == Import : local
import './field.scss';

// == Composant
const Field = ({
  value,
  type,
  name,
  placeholder,
  onChange,
}) => {
  const handleChange = (evt) => {
    // On récupére la valeur de l'input et son nom
    onChange(evt.target.value, name);
  };

  const inputId = `field-${name}`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="field-label"
      >
        {placeholder}
      </label>
      
      <input
        value={value}
        id={inputId}
        type={type}
        className="field-input"
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        required
      />

    </div>
  );
};

Field.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// Valeurs par défaut pour les props
Field.defaultProps = {
  value: '',
  type: 'text',
};

// == Export
export default Field;
