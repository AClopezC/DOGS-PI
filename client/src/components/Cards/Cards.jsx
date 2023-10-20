import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux';
import { cleanDogs, getAllDogs, getAllTemperaments, filterByTemperament } from "../../Redux/actions";


export default function Cards() {
   
   const dispatch = useDispatch();
   const dogs = useSelector(state => state.dogs);
   const temperamentos = useSelector(state => state.temperaments);
  
   useEffect(() => {
      dispatch(getAllDogs());
      dispatch(getAllTemperaments());
      return () => dispatch(cleanDogs());
   }, [dispatch]);
   

   //? FILTRO POR TEMPERAMENTO.
   const [temperament, setTemperament] = useState('');

   const handleChangeSelect = (event) => {
      setTemperament(event.target.value)
   };

   const handleFilterByTemperament = () => {
      if (temperament) {
         dispatch(filterByTemperament(temperament));
      }
   };

   //? FILTRO POR ORIGEN.
   const [origin, setOrigin] = useState('');
   // const [filteredDogs, setFilteredDogs] = useState([]);

   const handleChangeOrigin = (event) => {
      setOrigin(event.target.value);
   };

   const handleFilterOrigin = () => {
      if (origin) {
         if (origin === 'API') {
            return dogs.filter((dog) => {
               return dog.created === false;
            });
         }
         else if (origin === 'DB') {
            return dogs.filter((dog) => {
               return dog.created === true;
            });
         }
       }
   };


   //? LIMPIAR EL HOME.
   const handleClean = () => {
      dispatch(getAllDogs());
      alert('Pantalla fresca y lista para explorar');
      //? Setear el select del temperamento.
   };



   return (
    <div>
         <div>
         <SearchBar />

        <label htmlFor="temperament">Filtrar por temperamento</label>
        <select name="temperament" id="temperament" onChange={handleChangeSelect}>
               <option value="">Seleccione un temperamento</option>
               {
                  temperamentos.map((temp) => (
                     <option key={temp.nombre} value={temp.nombre}>{temp.nombre}</option>
                  ))
               }
        </select>
            <button onClick={handleFilterByTemperament}>Filtrar</button>
            <button onClick={handleClean}>Clean Home</button>
         </div>
         <div>
            <label htmlFor="origin">Filtrar por origen</label>
            <select name='origin' onChange={handleChangeOrigin}>
               <option value="">Seleccione un origen</option>
               <option value="API">API</option>
               <option value="DB">Base de datos</option>
            </select>
            <button onClick={handleFilterOrigin}>Filtrar</button>
            <button onClick={handleClean}>Clean Home</button>
         </div>
      <div>
        <label htmlFor="">Ordenar alfabéticamente</label>
        <button>A-Z</button>
        <button>Z-A</button>

            <label htmlFor="">Ordenar por peso</label>
            <button>ASC-DESC</button>
            <button>DESC-ASC</button>
         </div>
         <div>
            {
               Array.isArray(dogs) ? (
                  dogs.map(dog => {
                  return <Card
                     key={dog.id}
                     id={dog.id}
                     imagen={dog.imagen}
                     nombre={dog.nombre}
                     temperamento={dog.temperamento}
                     peso={dog.peso}
                  />
                  })
               ) : (
                     alert('No se encontraron perros por el nombre proporcionado')
               )
            }
         </div>
      </div>
   )
}