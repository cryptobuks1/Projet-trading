import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const User = ({
  rank,
  username,
  accountValorization,
  myUsername,
}) => {
  
  const evolution = ((accountValorization / 10000) - 1)*10;
  const evolutionRound = Math.round(evolution*100)/10;
  const signeEvolution = evolution > 0 ? '+' : ''; 

  const myPosition = myUsername === username ? 'myPosition' : '';

  return(
    <tr className={myPosition}>
      <td>{rank}</td>
       <td className="user">
        <NavLink className='link' to={`/dashboard/${username}`} >
          {username}
        </NavLink>
      </td>
      <td>{accountValorization} $</td>
      <td>{`${signeEvolution} ${evolutionRound}%`}</td>
    </tr>
  );
}

User.proptypes = {
  rank: PropTypes.string.isRequired,
  myUsername: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  accountValorization: PropTypes.number.isRequired,
}

export default User;
