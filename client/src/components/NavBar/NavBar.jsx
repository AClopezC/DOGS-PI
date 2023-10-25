import { Link } from "react-router-dom";
import style from './navBar.module.css';

export default function NavBar() {
   return (
      <div className={style.navbar}>
         <Link to='/'>
            <button className={style.button}>Landing</button>
         </Link>
         <Link to='/home'>
            <button className={style.button}>Home</button>
         </Link>
         <Link to='/create'>
            <button className={style.button}>Formulario</button>
         </Link>
      </div>
   )
}