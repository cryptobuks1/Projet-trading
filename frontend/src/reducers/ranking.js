import { SAVE_USERS_RANKING } from '../actions/ranking';

const initialState = {
  users: [],
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USERS_RANKING:
      return {
        ...state,
        users: action.users,
        loading: false,
      };

    default:
      return {
        ...state,
      };
  }
};
