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
   movingPage
} from "../../Redux/actions";
import style from './cards.module.css'


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

   const currentPage = useSelector(state => state.currentPage);

   //? PAGINADO
      const pagination = (event) => {
         dispatch(movingPage(event.target.name))
      }

   return (
    <div className={style.page}>
         <div>
            <div>
               <label className={style.label}>Page: {currentPage + 1}</label>
               <br />
               <button className={style.button} name='prev' onClick={pagination}>Prev</button>
               <button className={style.button} name='next' onClick={pagination}>Next</button>
            </div>
         <SearchBar />

        <label className={style.label} htmlFor="temperament">Filtrar por temperamento</label>
        <select className={style.select} name="temperament" id="temperament" onChange={handleChange}>
               <option value="">Seleccione un temperamento</option>
               {
                  temperamentos.map((temp) => (
                     <option key={temp.nombre} value={temp.nombre}>{temp.nombre}</option>
                  ))
               }
        </select>
            <button className={style.button} onClick={handleFilterByTemperament}>Filtrar</button>
            <button className={style.button} onClick={handleClean}>Clean Home</button>
         </div>
         <div>
            <label className={style.label} htmlFor="origin">Filtrar por origen</label>
            <select className={style.select} name='origin' id='origin' onChange={handleChangeOrigin}>
               <option value="">Seleccione un origen</option>
               <option value="API">API</option>
               <option value="DB">Base de datos</option>
            </select>
            <button className={style.button} onClick={handleFilterOrigin}>Filtrar</button>
            <button className={style.button} onClick={handleClean}>Clean Home</button>
         </div>
         <div>
            <label className={style.label} htmlFor="sorting">Ordenar alfabéticamente</label>
            <select className={style.select} name="sorting" id="sorting" onChange={handleChangeABC}>
               <option value="">Seleccione un orden</option>
               <option value="A-Z">A-Z</option>
               <option value="Z-A">Z-A</option>
            </select>
            <button className={style.button} onClick={handleSortingABC}>Ordenar</button>
         </div>
         <div>
            <label className={style.label} htmlFor="sortingW">Ordenar por peso</label>
            <select className={style.select} name="sortingW" id="sortingW" onChange={handleChangeW}>
               <option value="">Seleccione un orden</option>
               <option value="ASC">ASC</option>
               <option value="DESC">DESC</option>
            </select>
            <button className={style.button} onClick={handleSortingW}>Ordenar</button>
         </div>
         <div className={style.cards}>
            {Array.isArray(dogs) && dogs.length > 0 ? (
               dogs.map(dog => (
                  <Card
                     key={dog.id}
                     id={dog.id}
                     imagen={dog.imagen}
                     nombre={dog.nombre}
                     temperamento={dog.temperamento}
                     peso={dog.peso}
                  />
               ))
            ) : (
               <p className={style.errorMessage}>
                  No se encontraron perros por el nombre proporcionado
               </p>
            )}
         </div>
      </div>
   )
}