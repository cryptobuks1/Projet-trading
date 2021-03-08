import axios from 'axios';
import url from './url';

import {
  SIGNIN,
  saveUserData,
  SIGNUP,
  userRegistration,
  RESET_PASS,
  displayMessageReset,
  NEW_PASS,
  displayMessageNewPass,
} from '../actions/settings';
import { errorAuthSignUp, errorSignIn } from 'src/actions/errorsApi';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case SIGNIN: {
      const { username, password } = store.getState().auth.signIn;

      axios.post(
        `${url}api/login_check`,
        {
          username,
          password,
        },
      ).then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.data.username);
        localStorage.setItem('USDAmount', response.data.data.USDAmount);
        localStorage.setItem('email', response.data.data.email);
        store.dispatch(saveUserData(response.data));
      }).catch((error) => {
        store.dispatch(errorSignIn(error.response.data.message))
      });
      next(action);
      break;
    }
    case SIGNUP: {
      const { username, password, email } = store.getState().auth.signUp;
      axios.post(
        `${url}signup`, JSON.stringify({
          username,
          password,
          email,
        }),
      ).then((response) => {
        store.dispatch(userRegistration(response.data));
      }).catch((error) => {
        store.dispatch(errorAuthSignUp(error.response.data.Message, username, email))
      });

      next(action);
      break;
    }
    case RESET_PASS: {
      const { username } = store.getState().auth.reset;
      axios.get(
        `${url}password-reset/${username}`
      ).then((response) => {
        store.dispatch(displayMessageReset(response.data.message));
      }).catch((error) => {
        store.dispatch(displayMessageReset(error.response.data.message))
      });
      next(action);
      break;
    }
    case NEW_PASS: {
      const instance = axios.create({
        baseURL: url,
      });
      const { newPassword, newPasswordVerify } = store.getState().auth.newPass
      instance.post(
       `reset-password/${action.token}`, JSON.stringify({
          password_first: newPassword,
          password_second: newPasswordVerify,
        }),
      ).then((response) => {
        store.dispatch(displayMessageNewPass(response.data.message));
      }).catch((error) => {
        store.dispatch(displayMessageNewPass(error.response.data.message))
      });
      next(action);
      break;
    }
    default:
      // si cette action ne nous interesse pas, on la laisse passer
      next(action);
  }
};
