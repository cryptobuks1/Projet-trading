import React from 'react';
import PropTypes from 'prop-types';

import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const Graphic = ({ pairName, theme }) => {

  const changeTheme = theme ? Themes.DARK : Themes.LIGHT

  return(
    <div className="widget">
      <TradingViewWidget
        autosize={true}
        symbol={`BINANCE:${pairName}`}
        interval="D"
        timezone="Europe/Paris"
        theme={changeTheme}
        locale="fr"
        toolbar_bg="#f1f3f6"
        enable_publishing={false}
        allow_symbol_change={false}
        style={'1'}
      />
    </div>
  );
}

Graphic.propTypes = {
  pairName: PropTypes.string.isRequired,
  theme: PropTypes.bool.isRequired,
};

export default Graphic;
