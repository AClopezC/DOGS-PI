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
            if (stateValidate.nombre === '') {
               setError({ ...error, nombre: 'El nombre es requerido' });
            } else if (stateValidate.nombre.length > 68) {
               setError({ ...error, nombre: 'El nombre no puede exceder los 68 caracteres' })
            } else if (stateValidate.nombre.length < 3) {
               setError({ ...error, nombre: 'El nombre no puede tener mes de 3 caracteres' })
            } else {
               setError({ ...error, nombre: '' });
            }
            break;
         case 'imagen':
            if (stateValidate.imagen === '') {
               setError({ ...error, imagen: 'La imagen es requerida' });
            } else {
               const imagePattern = /\.(jpg|jpeg|png|gif)$/i;

               if (!imagePattern.test(stateValidate.imagen)) {
                  setError({ ...error, imagen: 'La URL de la imagen no es válida. Asegúrate de que sea una imagen con una extensión válida.' });
               } else {
                  setError({ ...error, imagen: '' });
               }
            };
            break;
         case 'altura':
            if (stateValidate.altura === '') {
               setError({ ...error, altura: 'La altura es requerida' });
            } else {
               setError({ ...error, altura: '' });
            }
            break;
         case 'peso':
            if (stateValidate.peso === '') {
               setError({ ...error, peso: 'El peso es requerido' });
            } else {
               setError({ ...error, peso: '' });
            }
            break;
         case 'añosDeVida':
            if (stateValidate.añosDeVida === '') {
               setError({ ...error, añosDeVida: 'Los años son requeridos' });
            } else if (isNaN(stateValidate.añosDeVida)) {
               setError({...error, añosDeVida: 'El valor a ingresar debe ser un número'})
            }
            else {
               setError({ ...error, añosDeVida: '' });
            }
            break;
         case 'temperamento':
            if (stateValidate.temperamento.length === 0) {
               setError({ ...error, temperamento: 'Debe seleccionar al menos un temperamento' });
            } else {
               setError({ ...error, temperamento: '' });
            }
            break;
         default:
            break;
      }
   };
   
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
         });
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

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         dispatch(createDog(state));
         alert("Perro creado con éxito");
      } catch (error) {
         alert("Hubo un error al crear el perro");
      }
   };

   return (
      <div className={style.div}>
         <NavBar/>
         <h1 className={style.h1}>FORMULARIO</h1>
         <h3 className={style.h3}>Crea una nueva raza de perro</h3>
         <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor='nombre' className={style.label}>Nombre: </label>
               <input id='nombre'placeholder="Raza del perro" className={style.input} name='nombre' onChange={handleChange} type="text" />
            <label htmlFor='nombre' className={style.error}>{error.nombre}</label>

            <label htmlFor='imagen' className={style.label}>Imagen: </label> 
               <input id='imagen' placeholder="URL / jpg, jpeg, png, gif " className={style.input} name='imagen' onChange={handleChange} type="url" />
            <label htmlFor='imagen' className={style.error}>{error.imagen}</label>
            
            <label htmlFor='altura' className={style.label}>Altura (en centímetros):</label>
               <input id='altura' placeholder='min-max' className={style.input} name='altura' onChange={handleChange} type="text" />
            <label htmlFor='altura' className={style.error}>{error.altura}</label>

            <label htmlFor='peso' className={style.label}>Peso (en kilogramos):</label>
               <input id='peso' placeholder='min-max' className={style.input} name='peso' onChange={handleChange} type="text" />
            <label htmlFor='peso' className={style.error}>{error.peso}</label>

            
            <label htmlFor='añosDeVida' className={style.label}>Años de vida: </label>
               <input id='añosDeVida' placeholder='Edad promedio' className={style.input} name='añosDeVida' onChange={handleChange} type="text" />
            <label htmlFor='añosDeVida' className={style.error}>{error.añosDeVida}</label>


            <label htmlFor='temperamento' className={style.label}>Selecciona un temperamento: </label>
               <select onChange={handleChange} name="temperamento" >
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
                        <button name='' id={temp} onClick={handleDelete}>x</button>
                     </div>)
               }
            </div>
            <input disabled={disable()} className={style.inputSubmit} type='submit'/>
         </form>
      </div>
   )
}