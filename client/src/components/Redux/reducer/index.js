import {
    GET_ALL_VIDEOGAMES,
    GET_NAMES,
    GET_VIDEOGAME,
    GET_BY_GENRES,
    CREATE_VIDEOGAME,
    ORDER_BY,
    FILTER_BY_SOURCE,
    FILTER_BY_GENRES,
    GET_PLATFORMS,
   // FILTER_BY_PLATFORMS,
   
} from '../action/index.js'

const initialState = {
    allVideogames: [],//para hacerle filtros y guardar el state
    videogames: [],//ME TRAE TODO
    videogame: [],//ME TRAIGO EL TALLE DE CADA UNO POR ID
    genres: [],//ME TRAIGO Los geners
    platforms: [],//trae las plataformas
    //error:[]//almacena los errores
}

//console.log('esto es el estado genres', initialState.genres);

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_VIDEOGAMES: //para mi home
            //console.log('esto es el estado videogames',action.type);
            return {
                ...state,
                allVideogames: action.payload,
                videogames: action.payload //de reserva
            };
        case GET_NAMES: //para mi searchbar
            // console.log('esto es el estado videogames',action.type);
            return {
                ...state,
                allVideogames: action.payload/* .err?[{Error:"No videogames Found"}] : action.payload, */
            };
        case GET_VIDEOGAME: //para mi ruta de detalle
            //console.log('esto es el estado videogames',action.type);
            return {
                ...state,
                videogame: action.payload
            };
        case GET_BY_GENRES:
            // console.log('action.payload',action.payload);
            return {
                ...state,
                genres: action.payload
            };
        case CREATE_VIDEOGAME:
            return {
                ...state
            }
        case ORDER_BY:
            let vgCopy = [...state.allVideogames]; //hago una copia de mi estado importante
            let ordenamiento

            switch (action.payload) {
                case 'All':
                    ordenamiento = [...state.allVideogames];
                    break;
                case 'A-Z':
                    ordenamiento = vgCopy.sort(function (a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1
                        }
                        return 0;
                    });
                    break;
                case 'Z-A':
                    ordenamiento = vgCopy.sort(function (a, b) {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return 1;
                        }
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1;
                        }
                        return 0;
                    })
                    break;
                case 'RatingAsc':
                    ordenamiento = vgCopy.sort(function (a, b) {
                        return a.rating - b.rating
                    })
                    break;
                case 'RatingDesc':
                    ordenamiento = vgCopy.sort(function (a, b) {
                        return b.rating - a.rating
                    })
                    break;
                default:
                    ordenamiento = vgCopy
                    break;
            }
            return {
                ...state,
                allVideogames: ordenamiento,
                videogames: ordenamiento
            };
        case FILTER_BY_GENRES:
            let aux = [];
            if (action.payload) {
                aux = state.videogames.filter(e => {
                    if (e.genres.length === 0) {
                        return e.genres
                    }
                    else if (e.genres.some(e => e.name === action.payload)) {
                        return e.genres.map(el => el.name)
                    } else {
                        return e.genres.includes(action.payload)
                    }
                })
            } else {
                aux = state.videogames
            }

            return {
                ...state,
                allVideogames: aux,
            }
        case FILTER_BY_SOURCE:
            let getVg = state.videogames;
            let filtrado = []

            switch (action.payload) {
                case 'api': filtrado = getVg.filter(el => typeof (el.id) === 'number'); break;
                case 'created': filtrado = getVg.filter(el => isNaN(el.id)); break;
                default: filtrado = getVg; break;
            }
            return {
                ...state,
                allVideogames: filtrado
            };


        case GET_PLATFORMS:
            return {
                ...state,
                platforms: [...action.payload]
            }
          
       /*  case FILTER_BY_PLATFORMS:
            let aux = [];
            if (action.payload) {
                aux = state.videogames.filter(e => {
                    if (e.platforms.length === 0) {
                        return e.platforms
                    }
                    else if (e.platforms.some(e => e.name === action.payload)) {
                        return e.platforms.map(el => el.name)
                    } else {
                        return e.platforms.includes(action.payload)
                    }
                })
            } else {
                aux = state.videogames
            } */
        default:
            return {
                ...state,
            };
    }
}

export default rootReducer