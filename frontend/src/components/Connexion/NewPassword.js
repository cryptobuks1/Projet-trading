import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Field from './Field';

const NewPassword = ({
  newPassword,
  newPasswordVerify,
  changeField,
  handleChangePass,
  messageNewPass,
}) => {
  const { slug } = useParams()
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleChangePass(slug);
  };
  const valideNewMessage = messageNewPass == 'Votre mot de passe a bien été modifié.' ? 'message__green' : 'message';
  return (
    <div className="newPass">
      <h2>Entrez votre nouveau mot de passe</h2>
      <div className={valideNewMessage}>{messageNewPass}</div>
      <form onSubmit={handleSubmit} className="newPass__form">
        <div className="newPass__form__field">
          <Field
            name="newPassword"
            placeholder="Mot de passe"
            type="password"
            value={newPassword}
            onChange={changeField}
          />
          <Field
            name="newPasswordVerify"
            placeholder="Confirmer votre mot de passe"
            type="password"
            value={newPasswordVerify}
            onChange={changeField}
          />
        </div>
        <div>
          <button type="submit">
            Changer de mot de passe
          </button>
        </div>
      </form>
    </div>
  );
};

NewPassword.propTypes = {
  newPassword: PropTypes.string.isRequired,
  newPasswordVerify: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleChangePass: PropTypes.func.isRequired,
  messageNewPass: PropTypes.string.isRequired,
};
export default NewPassword;
