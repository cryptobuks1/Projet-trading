import {
  USER_REGISTRATION,
  UPDATE_SIGNIN_FIELD,
  UPDATE_SIGNUP_FIELD,
  SAVE_USER_DATA,
  DISPLAY_ERROR_MESSAGE_AUTH_SIGN_UP,
  DISPLAY_MESSAGE_RESET,
  UPDATE_RESET_PASS_FIELD,
  DISPLAY_MESSAGE_NEW_PASS,
  UPDATE_NEW_PASS_FIELD,
} from '../actions/settings';
import { ERROR_AUTH_SIGNUP, ERROR_SIGNIN } from 'src/actions/errorsApi';

const initialState = {
  signIn: {
    username: '',
    password: '',
    message: '',
  },
  signUp: {
    username: '',
    password: '',
    email: '',
    message: '',
    passwordVerify: '',
  },
  reset: {
    username: '',
    message: '',
  },
  newPass: {
    newPassword: '',
    newPasswordVerify: '',
    message: '',
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Met à jour le state signIn
    case UPDATE_SIGNIN_FIELD:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          // nom de champ(qui correspond au state): et valeur du champ
          [action.fieldName]: action.newValue,
        },
      };

    // Met à jour le state signUp
    case UPDATE_SIGNUP_FIELD:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          // nom de champ(qui correspond au state): et valeur du champ
          [action.fieldName]: action.newValue,
        },
      };
    case USER_REGISTRATION:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          username: '',
          password: '',
          email: '',
          message: action.message,
        },
      };
    case SAVE_USER_DATA:
      return {
        ...state,
        signIn: {
          ...state.signIn,
        },
      };
    case ERROR_AUTH_SIGNUP:
      return {
        ...state,
        signUp: {
          message: action.message,
          username: action.username,
          email: action.email,
          password: '',
          passwordVerify: '',
        }
      };
    case DISPLAY_ERROR_MESSAGE_AUTH_SIGN_UP:
      return {
        ...state,
        signUp: {
          message: action.message,
          username: action.username,
          password: '',
          email: action.email,
          passwordVerify: '',
        }
      };
    case ERROR_SIGNIN:
      return {
        ...state,
        signIn: {
          message: action.message,
          username: '',
          password: '',
        }
      };
    case DISPLAY_MESSAGE_RESET:
      return {
        ...state,
        reset: {
          ...state.reset,
          message: action.message,
          username: '',
        }
      };
    case UPDATE_RESET_PASS_FIELD:
      return {
        ...state,
        reset: {
          ...state.reset,
          [action.fieldName]: action.newValue,
        }
      }
    case DISPLAY_MESSAGE_NEW_PASS:
      return {
        ...state,
        newPass: {
          newPassword: '',
          newPasswordVerify: '',
          message: action.message,
        }

      }
    case UPDATE_NEW_PASS_FIELD:
      return {
        ...state,
        newPass: {
          ...state.newPass,
          [action.fieldName]: action.newValue,
        }
      }
    default: // Si le reducer ne sait pas traiter l'action, il renvoie une copie du state
      return {
        ...state,
      };
  }
};
