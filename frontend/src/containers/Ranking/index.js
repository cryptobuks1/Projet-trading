import { connect } from 'react-redux';

import Ranking from 'src/components/Ranking';

import { fetchUsersRanking } from 'src/actions/ranking';

const mapStateToProps = (state) => ({
  username: state.user.username,
  loading: state.ranking.loading,
  users: state.ranking.users,
});

const mapDispatchToProps = (dispatch) => ({
  manageLoadRank: () => {
    dispatch(fetchUsersRanking());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
