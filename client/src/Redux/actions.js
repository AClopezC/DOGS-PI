import axios from 'axios';
import {
   GET_ALL_DOGS,
   GET_ALL_DOGS_BY_ID,
   CLEAN_DOGS,
   CLEAN_DETAIL,
   SEARCH_BY_NAME,
   GET_ALL_TEMPERAMENTS,
   FILTER_BY_TEMPERAMENT,
   // CREATE_DOG
} from './actionTypes';

export const getAllDogs = () => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get('http://localhost:3001/dogs');
         return dispatch({ type: GET_ALL_DOGS, payload: data })
      } catch (error) {
         throw error
      }
   }
};

export const getAllDogsById = (id) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);
         return dispatch({ type: GET_ALL_DOGS_BY_ID, payload: data })
      } catch (error) {
         throw error
      }
   }
};

export const cleanDogs = () => {
   return { type: CLEAN_DOGS }
};

export const cleanDetail = () => {
   return { type: CLEAN_DETAIL }
};

export const searchByName = (name) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get(`http://localhost:3001/name?name=${name}`);
         return dispatch({ type: SEARCH_BY_NAME, payload: data });
      } catch (error) {
         throw error
      }
   }
};

export const getAllTemperaments = () => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get('http://localhost:3001/temperaments');
         return dispatch({ type: GET_ALL_TEMPERAMENTS, payload: data })
      } catch (error) {
         throw error
      }
   }
};

export const filterByTemperament = (temperament) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.get(`http://localhost:3001/temperaments/${temperament}`);
         return dispatch({ type: FILTER_BY_TEMPERAMENT, payload: data })
      } catch (error) {
         throw error
      }
   }
};

// export const createDog = () => {
//    return async (dispatch) => {
//       try {
//          const data = 
//          return dispatch({type: CREATE_DOG, payload: data})
         
//       } catch (error) {
//          throw error
//       }
//    }
// };