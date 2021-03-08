import { SAVE_USER_DATA, LOGOUT, GET_USER_DATA_LOCAL, CHANGE_THEME } from '../actions/settings';
import { ORDER_PASSED } from '../actions/order';

const initialState = {
  username: '',
  token: '',
  USDAmount: 0,
  logged: false,
  theme: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_DATA:
      return {
        ...state,
        username: action.username,
        token: action.token,
        logged: true,
        USDAmount: action.USDAmount,
      };
    case ORDER_PASSED:
      return {
        ...state,
        USDAmount: action.new_amount,
      };
    case LOGOUT:
      return {
        ...state,
        username: '',
        token: '',
        logged: false,
        USDAmount: 0,
      };

      case CHANGE_THEME:
        return {
          ...state,
          theme: action.theme,
        }

      case GET_USER_DATA_LOCAL:
        return{
          ...state,
          username: action.username,
          token: action.token,
          logged: action.logged,
          USDAmount: action.USDAmount,
        }

    default: // Si le reducer ne sait pas traiter l'action, il renvoie une copie du state
      return {
        ...state,
      };
  }
};
