import React, {Fragment} from 'react';

import './About.css';
import './theme.scss';
import Card from "./Card";
import { FaGithub } from 'react-icons/fa';

const Team = [
  {
    name : 'Jocelyn',
    fonction : 'Git master',
    link : 'https://www.linkedin.com/in/jocelyn-lebaad/',
    speciality : "React",
    image : 'WalidAvatar.png'
  },
  {
    name : 'Julien',
    fonction : 'Lead dev front',
    link : 'https://www.linkedin.com/in/julien-marteau/',
    speciality : "React",
    image : 'JulienAvatar.png'
  },
  {
    name : 'Christophe',
    fonction : 'Product Owner',
    fonction2: 'et Scrum master',
    link : 'https://www.linkedin.com/in/christophebussi',
    speciality : "Symfony",
    image : 'ChristopheAvatar.png'
  },
  {
    name : 'Walid',
    fonction : 'Lead dev back',
    link : 'https://www.linkedin.com/in/walidmoussa/',
    speciality: "Symfony",
    image : 'WalidAvatar.png'
  }
];

const LinkGitHub = "https://github.com/O-clock-McFly/projet-concours-trading";

const About = () => (

  <div className="About">

    <h1 className="Title">Présentation de l'équipe</h1>

    <div className="Presentation">

          Après une formation intense de 700H où nous avons appris le métier de développeur web.
          Dans le cadre du projet de fin de formation "l'Apothéose", nous avons réalisé ce site afin de mettre en pratique tout ce que nous avons appris.
    </div>

    <div className="CardList">
      {
            Team.map((admin) => (

              <Card
              key={admin.name}
              name={admin.name}
              fonction={admin.fonction}
              fonction2={admin.fonction2}
              link={admin.link}
              image = {admin.image}
              speciality = {admin.speciality}
              />

            ))
      }
    </div>
    <div className="LinkProject">
      <FaGithub className="GithubIcon" />
      <a className="LinkGitHub" target="_blank" href={LinkGitHub}>Lien github du projet</a>
    </div>


  </div>


);

export default About;
