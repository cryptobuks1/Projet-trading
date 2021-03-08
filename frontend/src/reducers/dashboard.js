import {
  SAVE_HIS_ORDERS,
  SAVE_HIS_CRYPTOS,
  DISPLAY_TAB,
  SAVE_HIS_PORTFOLIO,
  RESET_LOADING,
  SAVE_HIS_RANK
} from "../actions/dashboard";

const initialState = {
  hisCryptos: [],
  hisOrders: [],
  hisRank: 0,
  loadingHisRank: true,
  loadingHisCryptos: true,
  loadingHisOrders: true,
  loadingHisPortfolio: true,
  displayCryptos: '__actived',
  displayOrders: '',
  displayPortfolio: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_HIS_ORDERS:
      return {
        ...state,
        loadingHisOrders: false,
        hisOrders: action.hisOrders,
      };
    case SAVE_HIS_CRYPTOS:
      return {
        ...state,
        loadingHisCryptos: false,
        hisCryptos: action.hisCryptos,
      }
      case SAVE_HIS_PORTFOLIO:
        return{
          ...state,
        hisPortfolio: action.hisPortfolio,
        loadingHisPortfolio: false,
        }
        case SAVE_HIS_RANK:
        return{
          ...state,
          hisRank: action.hisRank,
        loadingHisRank: false,
        }
    case DISPLAY_TAB:
      return {
        ...state,
        displayCryptos: action.cryptos,
        displayOrders: action.orders,
        displayPortfolio: action.portfolio,
      }
      case RESET_LOADING:
      return {
        ...state,
        hisCryptos: [],
        hisOrders: [],
        loadingHisCryptos: true,
        loadingHisOrders: true,
        loadingHisPortfolio: true,
        displayCryptos: '__actived',
        displayOrders: '',
        displayPortfolio: '',
      }
    default: // Si le reducer ne sait pas traiter l'action, il renvoie une copie du state
      return {
        ...state,
      };
  }
};
