import { connect } from 'react-redux';

import Order from 'src/components/Order';

import {
  placeTheOrder,
  displayMessageOrder,
  updateFieldQuantity,
  updateFieldAmount,
  removeDataFieldOrder,
} from '../../actions/order';

const mapStateToProps = (state) => ({
  quantity: state.order.quantity,
  amount: state.order.amount,
  pairname: state.order.pairname,
  name: state.order.name,
  USDAmount: state.user.USDAmount,
  actualQuantityPair: state.order.actualQuantityPair,
  message: state.order.message,
  symbol: state.order.symbol,
  logo: state.order.logo,
  theme: state.user.theme,
});

const mapDispatchToProps = (dispatch) => ({
  handlePlaceTheOrder: (ordertype, quotation) => {
    dispatch(placeTheOrder(ordertype, quotation));
  },
  changeFieldAmount: (newAmount, quotation) => {
    dispatch(updateFieldAmount(parseFloat(newAmount), quotation));
  },
  changeFieldQuantity: (newQuantity, quotation) => {
    dispatch(updateFieldQuantity(parseFloat(newQuantity), quotation));
  },
  handleDiplayMessage: (message) => {
    dispatch(displayMessageOrder(message));
  },
  removeDataField: ()=>{
    dispatch(removeDataFieldOrder())
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Order);
