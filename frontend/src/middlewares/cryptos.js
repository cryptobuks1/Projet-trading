import axios from 'axios';
import url from './url';

import { FETCH_CRYPTO, saveCryptos } from '../actions/crypto';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_CRYPTO: {
      axios.get(
        `${url}cryptos`,
      ).then((response) => {
        store.dispatch(saveCryptos(response.data));
      }).catch((error) => {
      });

      next(action);
      break;
    }

    default:
      // si cette action ne nous interesse pas, on la laisse passer
      next(action);
  }
};
