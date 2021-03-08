// import de redux et de l'enhancer
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// Import de notre middleware
import auth from 'src/middlewares/auth';
import cryptos from 'src/middlewares/cryptos';
import order from 'src/middlewares/order';
import ranking from 'src/middlewares/ranking';
import dashboard from 'src/middlewares/dashboard';


// import du reducer combine
import reducer from 'src/reducers';

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(auth, cryptos, order, ranking, dashboard),
));

// on rend dispo le store
export default store;
