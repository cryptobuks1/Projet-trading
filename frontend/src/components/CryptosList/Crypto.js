import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
const Crypto = ({
  logo,
  symbol,
  name,
  pairName,
  lastPrice,
  toOrder,
  priceChangePercent24h,
}) => {
  const percentAround = Math.round(priceChangePercent24h*100)/100;
  const handleClick = () => {
    toOrder(pairName, name, symbol, logo);
  };
  return (
    <div className="cryptos__crypto">
      <NavLink className='link' to={`/ordre/${pairName}`} onClick={handleClick}>
        <div className="cryptos__logo">
          <img className="cryptos__img" src={logo} alt={`logo_${name}`} />
          <div className="cryptos__name">{symbol} {name}</div>
        </div>
        <div className={`quote${pairName} cryptos__price`}>{lastPrice}</div>
        <div className={`var${pairName} cryptos__price24`}>{percentAround}</div>
      </NavLink>
    </div>
  );
};

Crypto.propTypes = {
  logo: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastPrice: PropTypes.number.isRequired,
  priceChangePercent24h: PropTypes.number.isRequired,
  pairName: PropTypes.string.isRequired,
  toOrder: PropTypes.func.isRequired,
};

export default Crypto;
