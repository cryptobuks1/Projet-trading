import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Crypto from './Crypto';

import './cryptos.scss';

let socket;

class Cryptos extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { manageLoad } = this.props;
    manageLoad();
  }

  componentDidUpdate() {
    const cryptosList = this.getFilteredCrypto();
    let streams = '';
    cryptosList.forEach((crypto) => {
      streams += '/' + crypto.pairName.toLowerCase() + '@ticker';
    });
    socket = new WebSocket(`wss://stream.binance.com:9443/ws${streams}`);
    socket.onmessage = (event) => {
      const objectData = JSON.parse(event.data);
      const DOMquote = document.querySelector('.quote' + objectData.s);
      const DOMvar = document.querySelector('.var' + objectData.s);
      const var24h = Number.parseFloat(objectData.P).toFixed(1);
      if (DOMquote != null) {
        let quote = objectData.c;
        DOMquote.textContent = quote;
        DOMvar.textContent = var24h + " %";
      }
    };
  }
  componentWillUnmount() {
    socket.close();
    this.props.clearFieldSearch()
  }

  getFilteredCrypto() {
    const { search, cryptos } = this.props;
    const loweredSearch = search.toLowerCase();
    const filteredCryptoList = cryptos.filter((crypto) => {
      const loweredCryptoName = crypto.name.toLowerCase();
      const loweredCryptoSymbol = crypto.symbol.toLowerCase();
      // on teste si la devise étudiée (en minuscule) contient
      // notre chaine de recherche (en mlinuscule elle aussi).
      // Et on renvoit le résultat...
      return (loweredCryptoName.includes(loweredSearch) || loweredCryptoSymbol.includes(loweredSearch));
    });

    return filteredCryptoList;
  }

  render() {
    const { loading, cryptos, toOrder, manageChangeSearch, search } = this.props;
    const cryptosList = this.getFilteredCrypto();
    return (
      <div className="cryptos">
        {loading && <div className="cryptos__waitLoadding">
          <FontAwesomeIcon
            size="5x"
            color="#4fdb88"
            icon={faSpinner}
            spin
          />
        </div>}
        {!loading && (
          <>
            <div className="cryptos__searchBar">
              <input
                className="cryptos_search"
                onChange={(event) => manageChangeSearch(event.target.value)}
                value={search}
                type="text"
                placeholder="Rechercher"
              />
            </div>

            <div className="cryptos__header">
              <div className="cryptos__logo">Nom</div>
              <div className="cryptos__price">Dernier prix USDT</div>
              <div className="cryptos__price24">Variation 24h</div>
            </div>
            <div className="cryptos__list">
              {
                cryptosList.map((crypto) => (
                  <Crypto
                    key={crypto.symbol}
                    {...crypto}
                    toOrder={toOrder}
                    cryptos={cryptos}
                  />
                ))
              }
            </div>
          </>
        )}

      </div>
    );
  }
}
export default Cryptos;
