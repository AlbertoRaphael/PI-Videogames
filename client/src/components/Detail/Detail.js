import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getVideogame } from "../Redux/action/index";
import img from '../../img/control.jpg'
import style from '../Detail/Detail.module.css'
import Loading from '../loading/Loading'
 

function Detail() {

    const [carga, setCarga] = useState(true);
    const {id} = useParams() //rutas dinamicas, Podemos acceder a cualquier parámetro de ruta de una ruta declarada con su componente asociado usando el hook useParams.
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getVideogame(id)).then(() => setCarga(false))
    }, [dispatch, id])

    const details = useSelector(state => state.videogame)
    //console.log(details)

    if (carga) {
        return <Loading />;
      }

    var regex = /(<([^>]+)>)/gi;


    return(
        <div className={style.wrapper}>
            <div className={style.main_card}>
                <div className={style.card_left}>
                    <div className={style.card_details}>
                    <h1 className={style.nombre}>{details.name}</h1>
                    <div className={style.card_cat}>
                        <p className={style.rating}>⭐ {details.rating}</p>
                        <p className={style.genres}>{details.genres?.map(g => (g.name ? g.name : g)).join('| ')}</p>
                        <p className={style.fecha}> 📅{details.released}</p>
                    </div>
                        <div className={style.description}>📌{details.description?.replace(regex, '').replace('&#39', '')}</div>
                        <div className={style.plataformas}>🎮: {details.platforms?.join(', ')}</div>
                    </div>
                </div>
                <div className={style.card_right}>
                    <img src={details.image ? details.image : img } alt={`${details.name}'s`} width="300px" height="150px"/>
                </div>
            </div>
            <div>
                <NavLink to={'/home'} className={style.btn}>
                    <span>↵ Back Home</span>
                </NavLink>
            </div>

        </div>
    )
}

export default Detail