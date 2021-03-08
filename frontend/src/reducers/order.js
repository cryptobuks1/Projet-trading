import {
  ORDER_PASSED,
  ACTUAL_QUANTITY_PAIR,
  DISPLAY_MESSAGE_ORDER,
  UPDATE_FIELD_AMOUNT,
  UPDATE_FIELD_QUANTITY,
  REMOVE_DATA_FIELD_ORDER,
} from '../actions/order';
import { TO_ORDER } from '../actions/crypto';
import {ERROR_ORDER_PASSED} from '../actions/errorsApi';

const initialState = {
  quantity: 0,
  amount: 0,
  pairname: '',
  name: '',
  logo: '',
  symbol: '',
  message: null,
  actualQuantityPair: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELD_AMOUNT:
      return {
        ...state,
        amount: action.newAmount,
        quantity: action.quantity,
      };
    case UPDATE_FIELD_QUANTITY:
      return {
        ...state,
        quantity: action.newQuantity,
        amount: action.amount,
      };
    case ORDER_PASSED:
      return {
        ...state,
        message: "Ordre Enregistré",
        actualQuantityPair: action.new_quantity,
        quantity: 0,
        amount: 0,
      };
    case TO_ORDER:
      return {
        ...state,
        pairname: action.pairname,
        name: action.name,
        symbol: action.symbol,
        logo: action.logo,
      };
    case ACTUAL_QUANTITY_PAIR:
      return {
        ...state,
        // nom de champ(qui correspond au state): et valeur du champ
        actualQuantityPair: action.actualPair.actualQuantity,
      };
    case DISPLAY_MESSAGE_ORDER:
      return {
        ...state,
        message: action.message,
      }
    case REMOVE_DATA_FIELD_ORDER:
      return {
        ...state,
        quantity: 0,
        amount: 0,
        pairname: '',
        name: '',
        logo: '',
        symbol: '',
        message: null,
      }
      case ERROR_ORDER_PASSED:
      return {
        ...state,
        message: action.message,
      }
    default: // Si le reducer ne sait pas traiter l'action, il renvoie une copie du state
      return {
        ...state,

      };
  }
};
