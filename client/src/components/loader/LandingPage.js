//import React from "react"

import React from "react";
import { Link } from "react-router-dom";
import linkedin from '../../img/linkedin (1).png'
import github from '../../img/github (1).png'
import gmail from '../../img/gmail (1).png'
import styles from './LandingPage.module.css';

export default function LandingPage(){
    return (
        <div className={styles.full}>
            <div className={styles.full_inner}>
                <div className={styles.content}>
                    <h1 className={styles.titulo}>Henry Videogames APP</h1>
                    <Link to='/home'>
                        <button className={styles.btn}>
                            <span className={styles.ingresar}>GET STARTED</span>
                        </button>
                    </Link>
                </div>
                <div className={styles.links}>
                    <div className={styles.mini_box}>
                        <a href='https://www.linkedin.com/in/alberto-lara-pulido-31a434159/' target="_blank" rel="noreferrer">
                            <img src={linkedin} alt='linkedin' />
                        </a>
                    </div>
                    <div className={styles.mini_box}>
                        <a href='https://github.com/AlbertoRaphael' target="_blank" rel="noreferrer">
                            <img src={github} alt='github' />
                        </a>
                    </div>
                    <div className={styles.mini_box}>
                        <a href='mail:albertoraphael123@gmail.com' target="_blank" rel="noreferrer">
                            <img src={gmail} alt='gmail' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )

}
