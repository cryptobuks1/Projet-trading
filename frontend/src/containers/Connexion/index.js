import { connect } from 'react-redux';

import Connexion from 'src/components/Connexion';

import {
  updateSingnInField,
  updateSingnUpField,
  signIn,
  signUp,
  displayErrorMessageAuthSignUp,
  updateResetPassField,
  resetPass,
  updateNewPassField,
  newPass,
} from '../../actions/settings';

const mapStateToProps = (state) => ({
  // sommes nous connecté
  logged: state.user.logged,
  // composant de connexion
  usernameSignIn: state.auth.signIn.username,
  passwordSignIn: state.auth.signIn.password,
  messageSignIn: state.auth.signIn.message,
  // composant d'inscription
  usernameSignUp: state.auth.signUp.username,
  passwordSignUp: state.auth.signUp.password,
  passwordVerifySignUp: state.auth.signUp.passwordVerify,
  email: state.auth.signUp.email,
  messageSignUp: state.auth.signUp.message,
   // composant récupération de mot de passe
   usernameRestPass: state.auth.reset.username,
   messageResetPass: state.auth.reset.message,
   // composant nouveaux mot de passe
   newPassword: state.auth.newPass.newPassword,
   newPasswordVerify: state.auth.newPass.newPasswordVerify,
   messageNewPass: state.auth.newPass.message,
});

const mapDispatchToProps = (dispatch) => ({
  // composant de connexion
  changeFieldSignIn: (newValue, fieldName) => {
    dispatch(updateSingnInField(newValue, fieldName));
  },

  handleSignIn: () => {
    dispatch(signIn());
  },

  // composant d'inscription
  changeFieldSignUp: (newValue, fieldName) => {
    dispatch(updateSingnUpField(newValue, fieldName));
  },
  handleSignUp: () => {
    dispatch(signUp());
  },
  handleDiplayMessage: (message,username,email) => {
    dispatch(displayErrorMessageAuthSignUp(message,username,email))
  },
  
   // composant de recuperation du mot de passe
   changeFieldResetPass: (newValue, fieldName) => {
    dispatch(updateResetPassField(newValue, fieldName));
  },
  handleResetPass: () => {
    dispatch(resetPass());
  },

   // composant du nouveau du mot de passe
   changeFieldNewPass: (newValue, fieldName) => {
    dispatch(updateNewPassField(newValue, fieldName));
  },
  handleChangePass: (token) => {
    dispatch(newPass(token));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Connexion);
