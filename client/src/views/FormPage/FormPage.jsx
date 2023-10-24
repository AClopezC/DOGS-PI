import NavBar from "../../components/NavBar/NavBar"
import style from './formPage.module.css'
import { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTemperaments, createDog } from "../../Redux/actions";


export default function FormPage() {
   
   const temperamento = useSelector(state => state.temperaments);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllTemperaments());
   }, [dispatch]);

   const [state, setState] = useState({
      nombre: "",
      imagen: "",
      altura: "",
      peso: "",
      añosDeVida: "",
      temperamento: []
   });

   const [error, setError] = useState({
      nombre: 'Este campo es requerido',
      imagen: 'Este campo es requerido',
      altura: 'Este campo es requerido',
      peso: 'Este campo es requerido',
      añosDeVida: 'Este campo es requerido',
      temperamento: 'Debe seleccionar al menos un temperamento'
   });



   const validate = (stateValidate, name) => {
      switch (name) {
         case 'nombre':
            setError(stateValidate.nombre === '' ? { ...error, nombre: 'El nombre es requerido' } : { ...error, nombre: '' });
            break;
         case 'imagen':
            setError(stateValidate.imagen === '' ? { ...error, imagen: 'La imagen es requerida' } : { ...error, imagen: '' });
            break;
         case 'altura':
            setError(stateValidate.altura === '' ? { ...error, altura: 'La altura es requerida' } : { ...error, altura: '' });
            break;
         case 'peso':
            setError(stateValidate.peso === '' ? { ...error, peso: 'El peso es requerido' } : { ...error, peso: '' });
            break;
         case 'añosDeVida':
            setError(stateValidate.añosDeVida === '' ? { ...error, añosDeVida: 'Los años son requeridos' } : { ...error, añosDeVida: '' });
            break;
         case 'temperamento':
            setError(stateValidate.temperamento === '' ? { ...error, temperamento: 'Debe seleccionar al menos un temperamento' } : { ...error, temperamento: '' });
            break;
         
         default:
            break;
      }
   }
   
   const disable = () => {
      for (let err in error) {
         if (error[err] !== '') {
            return true; // Si se encuentra un error, deshabilita el botón.
            }
         }
         return false; // Solo se habilita si no se encontraron errores.
   };

   const handleChange = (event) => {
      if (event.target.name === 'temperamento') {
         if (state.temperamento.includes(event.target.value)) return
         setState({
         ...state,
         [event.target.name]: [...state[event.target.name], event.target.value]
      })
      }
      else {
         setState({
         ...state,
         [event.target.name]: event.target.value
      })
      }
      validate({
         ...state,
         [event.target.name]: event.target.value
      }, event.target.name)
   };

   const handleDelete = (event) => {
      setState({
         ...state,
         [event.target.name]: [...state[event.target.name].filter(temp=> temp !== event.target.id)]
      })
   };

   const handleSubmit = (event) => {
      event.preventDefault()
      dispatch(createDog(state))
   };

   return (
      <div className={style.div}>
         <NavBar/>
         <h1 className={style.h1}>FormPage</h1>
         <h3 className={style.h3}>Crea una nueva raza de perro</h3>
         <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor='nombre' className={style.label}>Nombre: </label>
            <input id='nombre' className={style.input} name='nombre' onChange={handleChange} type="text" />
            <label htmlFor='nombre' className={style.error}>{error.nombre}</label>

            <label htmlFor='imagen' className={style.label}>Imagen: </label> 
            <input id='imagen' placeholder="URL" className={style.input} name='imagen' onChange={handleChange} type="text" />
            <label htmlFor='imagen' className={style.error}>{error.nombre}</label>
            
            <label htmlFor='altura' className={style.label}>Altura: </label>
            <input id='altura' className={style.input} name='altura' onChange={handleChange} type="text" />
            <label htmlFor='altura' className={style.error}>{error.altura}</label>

            
            <label htmlFor='peso' className={style.label}>Peso: </label>
            <input id='peso' className={style.input} name='peso' onChange={handleChange} type="text" />
            <label htmlFor='peso' className={style.error}>{error.peso}</label>

            
            <label htmlFor='añosDeVida' className={style.label}>Años de vida: </label>
            <input id='añosDeVida' className={style.input} name='añosDeVida' onChange={handleChange} type="text" />
            <label htmlFor='añosDeVida' className={style.error}>{error.añosDeVida}</label>


            <label htmlFor='temperamento' className={style.label}>Selecciona un temperamento: </label>
            <select onChange={handleChange} name="temperamento" id="temperamento">
               <option key='default' value="">Selecciona un temperamento</option>
               {
                  temperamento?.map((temp, index) => (
                     <option key={index} value={temp.nombre}>{temp.nombre}</option>
               ))
               }
            </select>
            <label htmlFor='temperamento' className={style.error}>{error.temperamento}</label>
            <div>
               <h3>Temperamentos seleccionados</h3>
               {
                  state.temperamento.map((temp, index) =>
                     <div key={index} > <label>{temp}</label>
                        <button name='temperamento' id={temp} onClick={handleDelete}>x</button>
                     </div>)
               }
            </div>
            <input disabled={disable()} className={style.inputSubmit} type='submit'/>
         </form>
      </div>
   )
}