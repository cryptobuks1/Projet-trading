import { connect } from 'react-redux';

import Header from 'src/components/Header';
import { changeTheme, logOut } from '../../actions/settings';

import { fecthHisPortfolio,fetchHisOrders,fecthHisCryptos,resetLoading } from '../../actions/dashboard';

const mapStateToProps = (state) => ({
  logged: state.user.logged,
  theme: state.user.theme,
  USDAmount: state.user.USDAmount,
  username: state.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogOut: () => {
    localStorage.clear();
    dispatch(logOut());
  },

  handleChangeTheme: (theme) => {
    dispatch(changeTheme(theme));
  },
  manageLoad: (username) => {
    dispatch(fecthHisPortfolio(username));
    dispatch(fetchHisOrders(username));
    dispatch(fecthHisCryptos(username));
  },
  resetLoading: () => {
    dispatch(resetLoading())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
