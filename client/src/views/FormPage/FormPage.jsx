import NavBar from "../../components/NavBar/NavBar"
import style from './formPage.module.css'
import { useState } from "react";


export default function FormPage() {

   const [state, setState] = useState({
      nombre: "",
      altura: "",
      peso: "",
      añosDeVida: "",
      temperamento: ""
   });

   const [error, setError] = useState({
      nombre: 'Este campo es requerido',
      altura: 'Este campo es requerido',
      peso: 'Este campo es requerido',
      añosDeVida: 'Este campo es requerido',
      temperamento: 'Debe seleccionar al menos un temperamento'
   });



   const validate = (stateVal, name) => {
      switch (name) {
         case 'nombre':
            setError(stateVal.nombre === '' ? { ...error, nombre: 'El nombre es requerido' } : { ...error, nombre: '' });
            break;
         case 'altura':
            setError(stateVal.altura === '' ? { ...error, altura: 'La altura es requerida' } : { ...error, altura: '' });
            break;
         case 'peso':
            setError(stateVal.peso === '' ? { ...error, peso: 'El peso es requerido' } : { ...error, peso: '' });
            break;
         case 'añosDeVida':
            setError(stateVal.añosDeVida === '' ? { ...error, añosDeVida: 'Los años son requeridos' } : { ...error, añosDeVida: '' });
            break;
         case 'temperamento':
            setError(stateVal.temperamento === '' ? { ...error, temperamento: 'Debe seleccionar al menos un temperamento' } : { ...error, temperamento: '' });
            break;
         
         default:
            break;
      }
   }
   


   const handleChange = (event) => {
      setState({
         ...state,
         [event.target.name]: event.target.value
      })
      validate({
         ...state,
         [event.target.name]: event.target.value
      }, event.target.name)
   };

   const handleSubmit = (event) => {
      event.preventDefault()
   };

   return (
      <div className={style.div}>
         <NavBar/>
         <h1 className={style.h1}>FormPage</h1>
         <h3 className={style.h3}>Crea una nueva raza de perro</h3>
         <form className={style.form} onSubmit={handleSubmit}>
            <label className={style.label}>Nombre: </label>
            <input className={style.input} name='nombre' onChange={handleChange} type="text" />
            <label className={style.error}>{error.nombre}</label>
            
            <label className={style.label}>Altura: </label>
            <input className={style.input} name='altura' onChange={handleChange} type="text" />
            <label className={style.error}>{error.altura}</label>

            
            <label className={style.label}>Peso: </label>
            <input className={style.input} name='peso' onChange={handleChange} type="text" />
            <label className={style.error}>{error.peso}</label>

            
            <label className={style.label}>Años de vida: </label>
            <input className={style.input} name='añosDeVida' onChange={handleChange} type="text" />
            <label className={style.error}>{error.añosDeVida}</label>


            <label className={style.label}>Selecciona un temperamento: </label>
            <select name="temperamento" id="">
               <option value=""></option>
            </select>
            <label className={style.error}>{error.temperamento}</label>

            <input className={style.input} type='submit'/>
         </form>
      </div>
   )
}