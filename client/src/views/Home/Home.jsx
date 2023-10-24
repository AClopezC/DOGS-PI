import NavBar from "../../components/NavBar/NavBar"
import Cards from '../../components/Cards/Cards';
import {movingPage} from '../../Redux/actions'
import { useDispatch, useSelector } from "react-redux";


export default function Home() {

   const dispatch = useDispatch();
   const currentPage = useSelector(state => state.currentPage);

   //? PAGINADO
      const pagination = (event) => {
         dispatch(movingPage(event.target.name))
      }
   
   return (
      
      <div>
         <div>
         <NavBar />
            <label>Page: {currentPage + 1}</label>
            <br />
            <button name='prev' onClick={pagination}>Prev</button>
            <button name='next' onClick={pagination}>Next</button>
         </div>
         <Cards />
      </div>
   )
}