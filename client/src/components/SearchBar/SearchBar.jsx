import { useState } from "react"
import { useDispatch } from 'react-redux';
import { getAllDogs, searchByName } from "../../Redux/actions";

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
      <div>
         <label>Busca un perro por su raza</label>
         <input onChange={handleChange} type="text" />
         <button onClick={handleSearchByName}>Search</button>
         <button onClick={handleClean}>Clean Home</button>
      </div>
   )
}