import {
   GET_ALL_DOGS,
   GET_ALL_DOGS_BY_ID,
   CLEAN_DETAIL,
   CLEAN_DOGS,
   SEARCH_BY_NAME,
   GET_ALL_TEMPERAMENTS,
   FILTER_BY_TEMPERAMENT,
   // CREATE_DOG,
} from './actionTypes'

const initialState = {
   dogs: [],
   dogsDetail: {},
   temperaments: []
}

export default function reducer (state = initialState, {type, payload}) {
   switch (type) {
      case GET_ALL_DOGS:
         return {
            ...state,
            dogs: payload
         };
      case GET_ALL_DOGS_BY_ID:
         return {
            ...state,
            dogsDetail: payload
         };
      case CLEAN_DOGS:
         return {
            ...state,
            dogs: []
         };
      case CLEAN_DETAIL:
         return {
            ...state,
            dogsDetail: {}
         };
      case SEARCH_BY_NAME:
         return {
            ...state,
            dogs: payload
         };
      case GET_ALL_TEMPERAMENTS:
         return {
            ...state,
            temperaments: payload
         };
      case FILTER_BY_TEMPERAMENT:
         return {
            ...state,
            dogs: payload
         };
      // case CREATE_DOG:
      //    return {
      //       ...state,

      //    }

         



      default:
         return {
            ...state
         }
   };
}

