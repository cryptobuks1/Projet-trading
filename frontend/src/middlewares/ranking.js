import axios from 'axios';
import url from './url';

import { FETCH_USERS_RANKING, saveUsersRanking } from '../actions/ranking';

export default (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_USERS_RANKING: {
      axios.get(
         `${url}ranking`,
      ).then((response) => {
        store.dispatch(saveUsersRanking(response.data));
      }).catch((error) => {
        console.log('erreur requete ranking');
      });

      next(action);
      break;
    }

    default:
      next(action);
  }
};
