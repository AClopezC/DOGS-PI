import NavBar from "../../components/NavBar/NavBar"
import Cards from '../../components/Cards/Cards';
import style from './home.module.css'


export default function Home() {
   return (
      <div className={style.page}>
         <NavBar />
         <Cards />
      </div>
   )
}