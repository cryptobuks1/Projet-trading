import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Field from './Field';

const ResetPassword = ({
  username,
  changeField,
  handleResetPass,
  messageResetPass,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleResetPass();
  };
  const valideNewMessage = 
  messageResetPass === 'Vous allez recevor un e-mail contenant un lien afin de redéfinir votre mot de passe'
  ? 'message__green' : 'message';
  return (
    <div className="resetPassword">
      <h2>Entrez votre pseudo pour reinitialiser pour votre mot de passe</h2>
      <div className={valideNewMessage}>{messageResetPass}</div>
      <form onSubmit={handleSubmit} className="resetPassword__form">
        <div className="resetPassword__form__field">
          <Field
            name="username"
            placeholder="Pseudo"
            value={username}
            onChange={changeField}
          />
        </div>
        <div>
          <button type="submit">
            Réinitialiser mon mot de passe
          </button>
        </div>
      </form>
    </div>
  );
};

ResetPassword.propTypes = {
  username: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleResetPass: PropTypes.func.isRequired,
  messageResetPass: PropTypes.string.isRequired,
};
export default ResetPassword;
