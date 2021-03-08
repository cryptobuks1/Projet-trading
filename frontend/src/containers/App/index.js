import { connect } from 'react-redux';

import App from 'src/components/App';

import {
  getUserDataLocal,
} from 'src/actions/settings';
import {
  fetchHisOrders,
} from 'src/actions/dashboard';

const mapStateToProps = (state) => ({
  // composant de connexion
  logged: state.user.logged,
  theme: state.user.theme,
  username: state.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDataLocal: () => {
    dispatch(getUserDataLocal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
