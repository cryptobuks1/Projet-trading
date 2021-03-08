import React from "react";
import ImageDefault from '../../assets/Images/imagedefault.png';
import ReactIcon from '../../assets/Images/react.png';
import SymfoIcon from '../../assets/Images/symfony-282493.png';
import { FaLinkedin } from 'react-icons/fa';


import "./Card.css";

const Card = ({ name, fonction, link, image, speciality, fonction2 }) => {

  let Img = ImageDefault;
  let IconSpeciality = null;
  let BackgroundClassName = null;

  if (name === 'Walid')
    BackgroundClassName = "Walid";
  if (name === 'Julien')
    BackgroundClassName = "Julien";
  if (name === 'Christophe')
    BackgroundClassName = "Christophe";
  if (name === 'Jocelyn')
    BackgroundClassName = "Joss";

  if (speciality === 'React')
    IconSpeciality = ReactIcon;
  if (speciality === 'Symfony')
    IconSpeciality = SymfoIcon;

  const LinkLinkedinOrPortfolio =  <FaLinkedin
    className="LinkedinIcon"
    color="#0a66c2"
    size="25px"
  />

  return (
    <div className="Card">
      <div className={BackgroundClassName}></div>
      <div className="CardInfos">
        <div className="Name">{name}</div>
        <div className="Fonction">{fonction} <br></br> {fonction2}</div>
        <div><img className="Speciality" src={IconSpeciality} /></div>
        <div className="Link"><a target="_blank" href={link}>{LinkLinkedinOrPortfolio}</a></div>
      </div>
    </div>
  )
}

export default Card;
