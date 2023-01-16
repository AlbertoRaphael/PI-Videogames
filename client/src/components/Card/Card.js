import React from "react";
//import s from '../style/CardVideogame.module.css'
import { NavLink } from "react-router-dom";
import s from './Card.module.css'

export default function Card({ name, image, genres, id, rating }) { 
/* class CardVideogame extends React.Component { */

    /* render() { */
    
        return (
            <div className={s.card}>
                
                <img src={image} width="400px" height="250px" alt=""/>
                
                <div className={s.card__content}>
                    <h3 >{name}</h3>
                    <p >{genres}</p>
                    <p >{rating}⭐</p>
                 <  NavLink to={`/videogame/${id}`} className={s.navLink}><span className={s.leer_mas}>Leer más</span></NavLink>
             </div>
            </div>
        )
    }

/* }


export default CardVideogame */



