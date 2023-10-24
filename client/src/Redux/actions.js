import axios from 'axios';
import {
   GET_ALL_DOGS,
   GET_ALL_DOGS_BY_ID,
   CLEAN_DOGS,
   CLEAN_DETAIL,
   SEARCH_BY_NAME,
   GET_ALL_TEMPERAMENTS,
   FILTER_BY_TEMPERAMENT,
   FILTER_BY_ORIGIN,
   SORTING_ABC,
   SORTING_BY_WEIGHT,
   CREATE_DOG,
   MOVING_PAGE
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
         const data  = await temperament;
         return dispatch({ type: FILTER_BY_TEMPERAMENT, payload: data })
      } catch (error) {
         throw error
      }
   }
};

export const filterByOrigin = (origin) => {
   return async (dispatch) => {
      try {
         return dispatch({ type: FILTER_BY_ORIGIN, payload: origin })
      } catch (error) {
         throw error
      }
   }
};

export const sortingABC = (sortAbc) => {
   return async (dispatch) => {
      try {
         return dispatch({ type: SORTING_ABC, payload: sortAbc })
      } catch (error) {
         
      }
   }
};

export const sortingByWeight = (sortW) => {
   return async (dispatch) => {
      try {
         return dispatch({ type: SORTING_BY_WEIGHT, payload: sortW })
      } catch (error) {
         
      }
   }
};

export const createDog = (state) => {
   return async (dispatch) => {
      try {
         const { data } = await axios.post('http://localhost:3001/create', state);
         return dispatch({ type: CREATE_DOG, payload: data });
      } catch (error) {
         throw error
      }
   }
};

export const movingPage = (order) => {
   return async (dispatch) => {
      try {
         return dispatch({type: MOVING_PAGE, payload: order})
      } catch (error) {
         throw error
      }
   }
}