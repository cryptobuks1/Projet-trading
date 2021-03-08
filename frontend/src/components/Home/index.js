/* eslint-disable max-len */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

// == Import style
import './home.scss';
import './BackgroundImage.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const classDivRules = isVisible ? 'home__rules__visible' : 'home__rules__hidden';
  const classRules = isVisible ? 'home__rules visible' : 'home__rules hidden';
  const classButton = isVisible ? 'handleRules visible' : 'handleRules hidden';
  const classRulesP = isVisible ? 'home__rules__p visible' : 'home__rules__p hidden';
  const classDot = isVisible ? 'dot-hidden' : 'dot-visible';
  const classChevron = isVisible ? 'iconCheveronTop' : 'iconCheveronDown';
  const classHomeAlign = isVisible ? 'homeAlign' : 'homeNotAlign';
  return (

    <div className={`home ${classHomeAlign}`}>

      <div className="ImageCover" ></div>

      <h2>Bienvenue sur Crypto Match</h2>
      <div className={classRules}>
        <div className={classRulesP}>
          <p>
            Nous organisons un concours de trading sur les cryptomonnaies sans argent réel du 15 février au 15 mars.<span className={classDot}>..</span>
          </p>
          <div className={classDivRules}>
            <p>
              Chaque participant obtiendra un capital de départ de 10 000 dollars fictifs qu’il pourra
              investir sur les cryptomonnaies de son choix. Vous avez la possibilité d'accéder à une page de classement ou vous pourrez voir qui aura engendré la plus grande plus-value. Ce classement est mis à jour toutes les 24 heures. Pour être classé, il vous faudra avoir passé un premier ordre. Pour vous inscrire au concours, vous devez impérativement vous inscrire avant le 15 février. Il est impossible de rejoindre une session déjà commencée.
            </p>
            <p>
              Le gagnant est celui qui aura engendré la plus grande plus-value au bout d'un mois.
            </p>
          </div>
        </div>
        <button
          className={classButton}
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          <FontAwesomeIcon
            className={classChevron}
            size="2x"
            icon={faChevronCircleDown}
          />
        </button>
      </div>
    </div>
  );
};

export default Home;
