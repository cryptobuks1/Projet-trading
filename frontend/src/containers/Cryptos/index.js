import { connect } from 'react-redux';

import Cryptos from 'src/components/CryptosList';

import {
  toOrder,
  fetchCrypto,
  changeSearch,
  clearFieldSearch,
} from 'src/actions/crypto';

const mapStateToProps = (state) => ({
  loading: state.crypto.loading,
  cryptos: state.crypto.cryptos,
  pairname: state.order.pairname,
  search: state.crypto.search,
});

const mapDispatchToProps = (dispatch) => ({
  // composant de connexion
  toOrder: (pairname,name, symbol, logo) => {
    dispatch(toOrder(pairname,name, symbol, logo));
  },
  manageLoad: () => {
    dispatch(fetchCrypto());
  },
  manageChangeSearch: (newSearch) => {
    dispatch(changeSearch(newSearch));
  },
  clearFieldSearch: () => {
    dispatch(clearFieldSearch());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cryptos);
