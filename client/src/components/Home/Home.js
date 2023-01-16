import React from "react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterByGenres, filterBySource, orderBy, getAllVideogames, getByGenres, getNames } from "../Redux/action";
//import { Videogames } from "../Card/Videogames";
import Card from "../Card/Card";
import img from '../../img/control.jpg'
import styles from './Home.module.css'
import Paginado from '../pages/Paginado';
import Error from "./Error";
//import Page404 from "./Page404";

import imagen from "../../img/portada.jpeg"
import Loading from '../loading/Loading'

export default function Home() {

    const [state, setState] = useState('') //me creo un estado local cuyo valor incial es vacio
    const dispatch = useDispatch()
    const [carga, setCarga] = useState(true);
    const allGames = useSelector(state => state.allVideogames)
    const generos = useSelector(state => state.genres)// el useSelector lee un valor del estado del store(reducer) y se suscribe a las actualizaciones del mismo.


    const [currentPage, setCurrentPage] = useState(1) //lo seteo en 1 porque siempre arranco por la primer pagina
    const gamesPerPage = 15//cantidad de juegos que debe haber por pagina
    const indexOfLastGame = currentPage * gamesPerPage // 1 * 15 = 15
    const indexOfFirstGame = indexOfLastGame - gamesPerPage // 15 - 15 = 0
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame) //para dividir la cantidad de juegos por pagina





    // const siguiente = () => setCurrentPage(currentPage+1)

    const paginado = (pageNumber) => { setCurrentPage(pageNumber) }     //establece el numero de pagina


    //const paginado = (5) => {
    //setCurrentPage(5)
    //}


    useEffect(() => {
        dispatch(getAllVideogames()).then(() => setCarga(false)) //me traigo la action creators q me trae todos mis videojuegos de la API
        dispatch(getByGenres())
    }, [dispatch]);



    function handleSort(e) {
        e.preventDefault()
        if (e.target.value === '') {
            dispatch(getAllVideogames())
        } else {
            dispatch(orderBy(e.target.value))
            setCurrentPage(1)
        }
    }

    function handleFilter(e) {
        e.preventDefault()
        if (e.target.value === '') {
            dispatch(getAllVideogames())
        } else {
            dispatch(filterByGenres(e.target.value))
            setCurrentPage(1)
        }
    }

    function handleSource(e) {
        e.preventDefault()
        if (e.target.value === '') {
            dispatch(getAllVideogames())
        } else {
            dispatch(filterBySource(e.target.value))
            setCurrentPage(1)
        }
    }


    function handleChange(e) { //cada vez que escriba algo en la barra de busqueda
        e.preventDefault()
        setState(e.target.value) //a mi estado incial lo seteo con el valor que voy ingresando en mi busqueda
    }

    function handleSubmit(e) {//aqui se actualiza el estado e la barra de busqueda
        e.preventDefault();
        if (state.length > 1) { //si escribo algo en mi barra de busqueda
            dispatch(getNames(state))
            setState('') //para limpiar mi busqueda
        } else {
            alert('No ingreso nada en la busqueda')
        }
    }

    const handleRefresh = (e) => {// aqui se despacha la acion refresh
        e.preventDefault()
        dispatch(getAllVideogames())
    }




    return (
        <div className={styles.bkg}>
            <div className={styles.img}>
                <img src={imagen} alt="nav" className={styles.gif} />
            </div>
            <div className={styles.search}>

                <form onSubmit={e => handleSubmit(e)}>  {/* este es para hacer enter y que funcione */}

                    <input
                        type='text'
                        id="rating"
                        autoComplete="off"
                        value={state}
                        placeholder='Buscar videojuego'
                        onChange={e => handleChange(e)} className={styles.input}
                    />
                    <button type='submit' className={styles.btnsearch}>search</button>
                </form>

            </div>
            <div className={styles.filterC}>
                <Link to='/videogame'> <button className={styles.create}>Create Videogame </button></Link>

                {/* <button className={styles.refresh}> Refresh Recipes</button> */}
                <button className={styles.refresh} onClick={e => handleRefresh(e)}> Refresh Recipes</button>

                <div className={styles.filt}>

                    <select className={styles.select} onChange={e => handleSort(e)}>
                        <option value="" >Ordenar por...</option>
                        <option value="A-Z" >A-Z</option>
                        <option value="Z-A" >Z-A</option>
                        <option value="RatingAsc">Rating Asc</option>
                        <option value="RatingDesc">Rating Desc</option>
                    </select>

                </div>

                <select defaultValue="all" className={styles.select} onChange={e => handleSource(e)} >

                    <option value="all">All</option>
                    <option value="api">Api</option>
                    <option value="created">DataBase</option>
                </select>

                <div>
                    <select id="genre" className={styles.select} onChange={e => handleFilter(e)}>
                        <option value=''>Generos</option>
                        {/*<GenreSelectOption 
                                allGenres={allGenres}  
                            />*/}
                        {generos && generos.map(g => {
                            return (
                                <option key={g.id} value={g.name}>{g.name}</option>
                            )
                        })}
                    </select>
                </div>


            </div>

            <div className={styles.paginado}>
                <Paginado
                    gamesPerPage={gamesPerPage}
                    allGames={allGames.length}
                    paginado={paginado}

                />
            </div>


            <div className={styles.cards}>



                {currentGames.length > 0 /* ?currentGames[0].msg === "There isn't pokemons" */ ?
                    currentGames?.map((e) => {

                        if (carga) {
                            return <Loading />;
                        }
                        return (
                            // e.Error? <h3 className={styles.errorMsj}>VideoGame No Existe</h3> :

                            <Card

                                id={e.id}
                                image={e.image ? e.image : img}
                                name={e.name}
                                genres={e.genres?.map(e => typeof (e) === 'object' ? e.name : e).join(', ')}
                                rating={e.rating}
                            />
                        )
                    }) : <Error /> }




            </div>
        </div >
    )
}
