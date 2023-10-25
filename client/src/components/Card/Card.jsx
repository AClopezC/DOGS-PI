import { Link } from 'react-router-dom'
import style from './card.module.css'

export default function Card ({id, imagen, nombre, temperamento, peso}) {
   return (
      <div className={style.card} >
         <h1 className={style.h1}>{nombre}</h1>
         <Link to={`/detail/${id}`}>
            <img className={style.img} src={imagen} alt={nombre} />
         </Link>
         <h3 className={style.h3}>Temperamento: {temperamento}</h3>
         <h3 className={style.h3}>Peso: {peso}</h3>
         <Link to={`/detail/${id}`}>
            <button className={style.button}>Detalle</button>
         </Link>
      </div>
   )
}