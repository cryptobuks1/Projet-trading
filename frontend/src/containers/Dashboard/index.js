import { connect } from 'react-redux';

import Dashboard from 'src/components/Dashboard';

import {
  fetchHisOrders,
  fecthHisCryptos,
  displayTab,
  fecthHisPortfolio,
  resetLoading,
  fetchHisRank,
} from 'src/actions/dashboard';

import {
  toOrder,
} from 'src/actions/crypto';

const mapStateToProps = (state) => ({
  hisCryptos: state.dashboard.hisCryptos,
  hisOrders: state.dashboard.hisOrders,
  hisPortfolio: state.dashboard.hisPortfolio,
  hisRank: state.dashboard.hisRank,
  username: state.user.username,
  loadingHisCryptos: state.dashboard.loadingHisCryptos,
  loadingHisOrders: state.dashboard.loadingHisOrders,
  loadingHisPortfolio: state.dashboard.loadingHisPortfolio,
  loadingHisRank: state.dashboard.loadingHisRank,
  displayCryptos: state.dashboard.displayCryptos,
  displayOrders: state.dashboard.displayOrders,
  displayPortfolio: state.dashboard.displayPortfolio,
  theme: state.user.theme,
});

const mapDispatchToProps = (dispatch) => ({
  manageLoad: (username) => {
    dispatch(fecthHisPortfolio(username));
    dispatch(fetchHisOrders(username));
    dispatch(fecthHisCryptos(username));
    dispatch(fetchHisRank(username))
  },
  toOrder: (pairname,name, symbol, logo) => {
    dispatch(toOrder(pairname,name, symbol, logo));
  },
  handleClickTab: (type) => {
    dispatch(displayTab(type));
  },
  resetLoading: () => {
    dispatch(resetLoading())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
