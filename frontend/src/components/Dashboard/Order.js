import React from 'react';
import PropTypes from 'prop-types';
import './dashboard.scss';

import { NavLink } from 'react-router-dom';
const Order = ({
  pairname,quantity,quotation,orderType,amount,createdAt
}) => {
  const date = new Date(createdAt);
  const years = date.toLocaleDateString();
  const hours = date.toLocaleTimeString('fr');
  const amoutnAround = Math.round(amount*100)/100;
  const quantityAround = Math.round(quantity*10000)/10000;
  return (
    <div className="hisOrder">
          <div className="hisOrder__createdAt">{years} {hours}</div>
          <div className="hisOrder__name">{pairname}</div>
          <div className="hisOrder__type">{orderType}</div>
          <div className="hisOrder__quantity">{quantityAround}</div>
          <div className="hisOrder__quotation">{quotation}</div>
          <div className="hisOrder__amount">{amoutnAround}</div>
  </div>
  );
};

Order.propTypes = {
  pairname: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  quotation: PropTypes.number.isRequired,
  orderType: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Order;
