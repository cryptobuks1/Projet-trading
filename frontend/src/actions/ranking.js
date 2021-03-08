export const FETCH_USERS_RANKING = 'FETCH_USERS_RANKING';
export const SAVE_USERS_RANKING = 'SAVE_USERS_RANKING';

export const fetchUsersRanking = () => ({
  type: FETCH_USERS_RANKING,
});

export const saveUsersRanking = (users) => ({
  type: SAVE_USERS_RANKING,
  users,
});

