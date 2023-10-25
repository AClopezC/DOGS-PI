import style from './landing.module.css'
import { Link } from "react-router-dom"

export default function Landing() {
   return (
      <div className={style.page}>
         <h1 className={style.h1}>Welcome to Dogs App</h1>
         <Link to='/home'>
            <button className={style.h1}>Home</button>
         </Link>
         
      </div>
   )
}
