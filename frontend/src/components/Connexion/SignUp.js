import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Field from './Field';

const SignUp = ({
  username,
  email,
  password,
  changeField,
  handleSignUp,
  messageSignUp,
  passwordVerify,
  handleDiplayMessage,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (passwordVerify != password) {
      handleDiplayMessage("Vos mots de passe ne sont pas identique",username,email);
    }
    else if(email == ''){
      handleDiplayMessage("L'email doit étre valide",username,email);
    }else{
      handleSignUp();

    }
  };
  let displayMessage = "message"
    if (messageSignUp == 'Inscription réussie') {
      displayMessage = 'message__green'
    } 
  

  return (
    <div className="signUp">
      <h2>Créer votre compte !</h2>
      <div className={displayMessage}>{messageSignUp}</div>
      <form onSubmit={handleSubmit} className="signUp__form">
        <div className="signUp__form__field">
          <Field
            name="username"
            placeholder="Pseudo"
            value={username}
            onChange={changeField}
          />
          <Field
            name="email"
            placeholder="Email"
            value={email}
            onChange={changeField}
          />
          <Field
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={changeField}
          />
          <Field
            name="passwordVerify"
            type="password"
            placeholder="Confirmer votre mot de passe"
            value={passwordVerify}
            onChange={changeField}
          />
        </div>

        <div>
          <NavLink to="/connexion" exact>
            <div className="signUpRedirection">déjà inscrit ?</div>
          </NavLink>
          <button type="submit">
            Inscription
            </button>
        </div>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordVerify: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  messageSignUp: PropTypes.string,
};
export default SignUp;
