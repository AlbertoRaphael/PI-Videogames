import React from 'react'
import loading from '../../img/cargadorobot.gif'
import s from './Loading.module.css'

export default function PaginaDeCarga() {
    return (
          <div className={s.box_loading}>
            {/* <img src={loading} alt="" /> */}
            <img src={loading} alt="" />
          </div>
    )}