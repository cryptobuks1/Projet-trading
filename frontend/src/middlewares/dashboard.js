import axios from 'axios';
import url from './url';

import {
  FETCH_HIS_ORDERS,
  saveHisOrders,
  FECTH_HIS_CRYPTOS,
  saveHisCryptos,
  FETCH_HIS_PORTFOLIO,
  saveHisPortfolio,
  FETCH_HIS_RANK,
  saveHisRank,
}from '../actions/dashboard';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_HIS_ORDERS: {
      axios.get(
        `${url}orders/${action.username}`,
      ).then((response) => {
        store.dispatch(saveHisOrders(response.data));
      }).catch((error) => {
        console.log('erreur requete hisOrder');
      });
      next(action);
      break;
    }
    case FECTH_HIS_CRYPTOS: {
      axios.get(
        `${url}portfolio/${action.username}`,
      ).then((response) => {
        store.dispatch(saveHisCryptos(response.data));
      }).catch((error) => {
        console.log('erreur requete hisCryptos');
      });
      next(action);
      break;
    }
    case FETCH_HIS_PORTFOLIO: {
      axios.get(
        `${url}histoval/${action.username}`,
      ).then((response) => {
        store.dispatch(saveHisPortfolio(response.data));
      }).catch((error) => {
        console.log(error.response);
        store.dispatch(saveHisPortfolio(error.response.data.message));
      });
      next(action);
      break;
    }
    case FETCH_HIS_RANK: {
      axios.get(
        `${url}rank/${action.username}`,
      ).then((response) => {
        store.dispatch(saveHisRank(response.data.rank));
      }).catch((error) => {
        console.log(error.response);
        store.dispatch(saveHisRank(error.response.data.message));
      });
      next(action);
      break;
    }

    default:
      // si cette action ne nous interesse pas, on la laisse passer
      next(action);
  }
};
