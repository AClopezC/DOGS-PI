import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux';
import {
   cleanDogs,
   getAllDogs,
   getAllTemperaments,
   filterByTemperament,
   filterByOrigin,
   sortingABC,
   sortingByWeight,
} from "../../Redux/actions";


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

   const handleChange = (event) => {
      setTemperament(event.target.value)
   };

   const handleFilterByTemperament = () => {
      if (temperament) {
         dispatch(filterByTemperament(temperament));
      }
   };

   //? FILTRO POR ORIGEN.
   const [origin, setOrigin] = useState('');

   const handleChangeOrigin = (event) => {
      setOrigin(event.target.value);
   };

   const handleFilterOrigin = () => {
      if (origin) {
         dispatch(filterByOrigin(origin));
       }
   };

   //? ORDENAMIENTO ALFABÉTICO.
   const [sortAbc, setSortAbc] = useState('');

   const handleChangeABC = (event) => {
      setSortAbc(event.target.value);
   };

   const handleSortingABC = () => {
      if (sortAbc) {
         dispatch(sortingABC(sortAbc));
       }
   };

   //? ORDENAMIENTO POR PESO.
   const [sortW, setSortW] = useState('');

   const handleChangeW = (event) => {
      setSortW(event.target.value);
   };

   const handleSortingW = () => {
      if (sortW) {
         dispatch(sortingByWeight(sortW));
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
        <select name="temperament" id="temperament" onChange={handleChange}>
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
            <select name='origin' id='origin' onChange={handleChangeOrigin}>
               <option value="">Seleccione un origen</option>
               <option value="API">API</option>
               <option value="DB">Base de datos</option>
            </select>
            <button onClick={handleFilterOrigin}>Filtrar</button>
            <button onClick={handleClean}>Clean Home</button>
         </div>
         <div>
            <label htmlFor="sorting">Ordenar alfabéticamente</label>
            <select name="sorting" id="sorting" onChange={handleChangeABC}>
               <option value="">Seleccione un orden</option>
               <option value="A-Z">A-Z</option>
               <option value="Z-A">Z-A</option>
            </select>
            <button onClick={handleSortingABC}>Ordenar</button>
         </div>
         <div>
            <label htmlFor="sortingW">Ordenar por peso</label>
            <select name="sortingW" id="sortingW" onChange={handleChangeW}>
               <option value="">Seleccione un orden</option>
               <option value="ASC">ASC</option>
               <option value="DESC">DESC</option>
            </select>
            <button onClick={handleSortingW}>Ordenar</button>
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