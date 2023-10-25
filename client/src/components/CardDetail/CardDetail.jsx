import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllDogsById, cleanDetail} from "../../Redux/actions";
import NavBar from "../NavBar/NavBar";
import style from './cardDetail.module.css';


export default function CardDetail() {
   
   const dispatch = useDispatch();
   const detail = useSelector((state) => state.dogsDetail)
   const { id } = useParams();

   useEffect(() => {
      dispatch(getAllDogsById(id));
      return () => dispatch(cleanDetail());
   }, [dispatch, id])

   return (
      <div className={style.card}>
         <NavBar/>
         <h4 className={style.h4}>ID: {detail?.id}</h4>
         <h1 className={style.h1}>Raza: {detail?.nombre}</h1>
         <img className={style.img} src={detail?.imagen} alt={detail?.nombre} />
         <h3 className={style.h3}>Altura: {detail?.altura}</h3>
         <h3 className={style.h3}>Peso: {detail?.peso}</h3>
         <h3 className={style.h3}>Temperamento: {detail?.temperamento}</h3>
         <h3 className={style.h3}>Años de vida: {detail?.añosDeVida}</h3>
      </div>
   )
}