export const FETCH_HIS_ORDERS = 'FETCH_HIS_ORDERS';
export const SAVE_HIS_ORDERS = 'SAVE_HIS_ORDERS';
export const FECTH_HIS_CRYPTOS = 'FECTH_HIS_CRYPTOS';
export const SAVE_HIS_CRYPTOS = 'SAVE_HIS_CRYPTOS';
export const DISPLAY_TAB = 'DISPLAY_TAB';
export const FETCH_HIS_PORTFOLIO = 'FETCH_HIS_PORTFOLIO';
export const SAVE_HIS_PORTFOLIO = 'SAVE_HIS_PORTFOLIO';
export const FETCH_HIS_RANK = 'FETCH_HIS_RANK';
export const SAVE_HIS_RANK = 'SAVE_HIS_RANK';
export const RESET_LOADING = 'RESET_LOADING';


export const fetchHisOrders = (username) => ({
  type: FETCH_HIS_ORDERS,
  username,
});
export const saveHisOrders = (hisOrders) => ({
  type: SAVE_HIS_ORDERS,
  hisOrders,
});
export const fecthHisCryptos = (username) => ({
  type: FECTH_HIS_CRYPTOS,
  username,
});
export const saveHisCryptos = (hisCryptos) => ({
  type: SAVE_HIS_CRYPTOS,
  hisCryptos,
})
export const fecthHisPortfolio = (username) => ({
  type: FETCH_HIS_PORTFOLIO,
  username,
})
export const saveHisPortfolio = (hisPortfolio) => ({
  type: SAVE_HIS_PORTFOLIO,
  hisPortfolio,
})
export const fetchHisRank = (username) => ({
  type: FETCH_HIS_RANK,
  username,
})
export const saveHisRank = (hisRank) => ({
  type: SAVE_HIS_RANK,
  hisRank,
})
export const displayTab = (type) => {
  const cryptos = type === 'cryptos' ? '__actived' :'';
  const orders = type === 'orders' ? '__actived' :'';
  const portfolio = type === 'portfolio' ? '__actived' :'';
  return({
  type: DISPLAY_TAB,
  cryptos: cryptos,
  portfolio: portfolio,
  orders: orders,
})}
export const resetLoading = () => ({
  type: RESET_LOADING,
})
