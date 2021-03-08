import React from 'react';
import PropTypes from 'prop-types';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import NewPassword from './NewPassword';
import './connexion.scss'

const Connexion = ({
  // le path de la page courante
  page,
  // page connexion
  usernameSignIn,
  passwordSignIn,
  changeFieldSignIn,
  handleSignIn,
  messageSignIn,
  // page inscription
  messageSignUp,
  handleSignUp,
  usernameSignUp,
  passwordSignUp,
  passwordVerifySignUp,
  email,
  changeFieldSignUp,
  handleDiplayMessage,
  //page resetPass
  usernameRestPass,
  changeFieldResetPass,
  handleResetPass,
  messageResetPass,
  //page newPassword
  newPassword,
  newPasswordVerify,
  changeFieldNewPass,
  handleChangePass,
  messageNewPass,
}) => {
  let componentToDisplayed;
  if (page === 'signIn') {
    componentToDisplayed =
      <SignIn
        username={usernameSignIn}
        password={passwordSignIn}
        changeField={changeFieldSignIn}
        handleSignIn={handleSignIn}
        messageSignIn={messageSignIn}
      />
  } else if (page === 'signUp') {
    componentToDisplayed =
      <SignUp
        username={usernameSignUp}
        email={email}
        password={passwordSignUp}
        passwordVerify={passwordVerifySignUp}
        changeField={changeFieldSignUp}
        handleSignUp={handleSignUp}
        messageSignUp={messageSignUp}
        handleDiplayMessage={handleDiplayMessage}
      />
  } else if (page === 'resetPass') {
    componentToDisplayed =
      <ResetPassword
        username={usernameRestPass}
        changeField={changeFieldResetPass}
        handleResetPass={handleResetPass}
        messageResetPass={messageResetPass}
      />
  } else if (page === 'newPass') {
    componentToDisplayed =
      <NewPassword
        newPassword={newPassword}
        newPasswordVerify={newPasswordVerify}
        changeField={changeFieldNewPass}
        handleChangePass={handleChangePass}
        messageNewPass={messageNewPass}
      />
  }


  // On retourne le composant à afficher suivant le path
  return (
    <div className="connexion">
      {componentToDisplayed}
    </div>
  );
};

Connexion.propTypes = {
  page: PropTypes.string.isRequired,

  usernameSignIn: PropTypes.string.isRequired,
  passwordSignIn: PropTypes.string.isRequired,
  changeFieldSignIn: PropTypes.func.isRequired,
  handleSignIn: PropTypes.func.isRequired,
  messageSignIn: PropTypes.string.isRequired,

  usernameSignUp: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  passwordSignUp: PropTypes.string.isRequired,
  passwordVerifySignUp: PropTypes.string.isRequired,
  changeFieldSignUp: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  handleDiplayMessage: PropTypes.func.isRequired,
  messageSignUp: PropTypes.string,

  usernameRestPass: PropTypes.string.isRequired,
  changeFieldResetPass: PropTypes.func.isRequired,
  handleResetPass: PropTypes.func.isRequired,
  messageResetPass: PropTypes.string.isRequired,

  newPassword: PropTypes.string.isRequired,
  newPasswordVerify: PropTypes.string.isRequired,
  changeFieldNewPass: PropTypes.func.isRequired,
  handleChangePass: PropTypes.func.isRequired,
  messageNewPass: PropTypes.string.isRequired,
};
export default Connexion;
