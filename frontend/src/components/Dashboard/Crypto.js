import React from 'react';
import PropTypes from 'prop-types';
import './dashboard.scss';
import { NavLink } from 'react-router-dom';

const Crypto = ({
  toOrder,
  actualQuantity,
  pairName,
  name,
  symbol,
  buyingPrice,
  realTimeUSDTAmount,
  realTimePrice,
  logoUrl
}) => {
  const handleClick = () => {
    toOrder(pairName, name, symbol, logoUrl);
  };
  const percent = ((realTimePrice/buyingPrice)*100)-100
  const percentAround = Math.round(percent*100)/100;
  const realTimeUSDTAmountAround = Math.round(realTimeUSDTAmount*10000)/10000;
  const actualQuantityAround = Math.round(actualQuantity*10000)/10000;
  let perncentClass = ''
  if (realTimePrice > buyingPrice ) {
    perncentClass = 'mostValue';
  }else{
    perncentClass = 'lessValue';
  }
  return (
    <NavLink className='link' to={`/ordre/${pairName}`} onClick={handleClick} >
      <div className="hisCrypto">
        <div className="hisCrypto__logo">
          <img className="hisCrypto__img" src={logoUrl} alt={`logo_${pairName}`} />
          <div className="hisCrypto__name">{name}</div>
        </div>
        <div className="hisCrypto__quantity">{actualQuantityAround}</div>
        <div className="hisCrypto__buyingPrice">{realTimePrice}</div>
        <div className="hisCrypto__valuation">{realTimeUSDTAmountAround}</div>
        <div className={`hisCrypto__percent ${perncentClass}`}>{percentAround}%</div>
      </div>
    </NavLink>
  );
};

Crypto.propTypes = {
  actualQuantity: PropTypes.number.isRequired,
  pairName: PropTypes.string.isRequired,
  buyingPrice: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
  realTimePrice: PropTypes.number.isRequired,
  realTimeUSDTAmount: PropTypes.number.isRequired,
  toOrder: PropTypes.func.isRequired,
};

export default Crypto;
