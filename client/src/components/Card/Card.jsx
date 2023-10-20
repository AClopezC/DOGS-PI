import {Link} from 'react-router-dom'

export default function Card ({id, imagen, nombre, temperamento, peso}) {
   return (
      <div>
         <h1>{nombre}</h1>
         <Link to={`/detail/${id}`}>
            <img src={imagen} alt={nombre} />
         </Link>
         <h3>Temperamento: {temperamento}</h3>
         <h3>Peso: {peso}</h3>
         <Link to={`/detail/${id}`}>
            <button>Detalle</button>
         </Link>
      </div>
   )
}