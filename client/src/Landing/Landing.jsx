import style from './landing.module.css'
import { Link } from "react-router-dom"

export default function Landing() {
   return (
      <div className={style.page}>
         <h1>This is landing</h1>
         <Link to='/home'>
            <button>Home</button>
         </Link>
         
      </div>
   )
}
