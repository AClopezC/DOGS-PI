import { useState } from "react"
import { useDispatch } from 'react-redux';
import { getAllDogs, searchByName } from "../../Redux/actions";
import style from './searchBar.module.css';

export default function SearchBar() {
   
   const dispatch = useDispatch();

   const [name, setName] = useState('');

   const handleChange = (event) => {
      setName(event.target.value);
   };

   const handleSearchByName = () => {
      if (name) {
         dispatch(searchByName(name));
      }
   };

   const handleClean = () => {
      dispatch(getAllDogs());
      alert('Pantalla fresca y lista para explorar');
      setName(''); //? No está sirviendo este set. El nombre queda en la barra.
   };

   return (
      <div className={style.search}>
         <label className={style.label}>Busca un perro por su raza</label>
         <input className={style.input} onChange={handleChange} type="text" />
         <button className={style.button} onClick={handleSearchByName}>Search</button>
         <button className={style.button} onClick={handleClean}>Clean Home</button>
      </div>
   )
}