import {
   GET_ALL_DOGS,
   GET_ALL_DOGS_BY_ID,
   CLEAN_DETAIL,
   CLEAN_DOGS,
   SEARCH_BY_NAME,
   GET_ALL_TEMPERAMENTS,
   FILTER_BY_TEMPERAMENT,
   FILTER_BY_ORIGIN,
   CREATE_DOG,
   SORTING_ABC,
   SORTING_BY_WEIGHT,
   MOVING_PAGE
} from './actionTypes'

const initialState = {
   dogs: [],
   dogsBackUp: [],
   dogsDetail: {},
   temperaments: [],
   currentPage: 0
}

export default function reducer(state = initialState, { type, payload }) {
   const itemsXpage = 8;
   switch (type) {
      case GET_ALL_DOGS:
         return {
            ...state,
            dogs: [...payload].splice(0, itemsXpage),
            dogsBackUp: payload
         };
      case GET_ALL_DOGS_BY_ID:
         return {
            ...state,
            dogsDetail: payload
         };
      case CLEAN_DOGS:
         return {
            ...state,
            dogs: [...state.dogsBackUp]
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
            temperaments: payload,
         };
      case FILTER_BY_TEMPERAMENT:
         return {
            ...state,
            dogs: [...state.dogsBackUp].filter(dog => dog.temperamento && dog.temperamento.includes(payload))
         };
      case FILTER_BY_ORIGIN:
         let filteredDogs;

         if (payload === 'API') {
            filteredDogs = state.dogsBackUp.filter(dog => typeof dog.id === 'number');
         }
         else if (payload === 'DB') {
            filteredDogs = state.dogsBackUp.filter(dog => typeof dog.id === 'string')
         }
         else {
            filteredDogs = state.dogsBackUp;
         }

         if (filteredDogs.length < 1) {
            alert('No se encontraron perros');
         }
         return {
            ...state,
            dogs: filteredDogs
         };       
      case SORTING_ABC:
         if (payload === 'A-Z') {
            return {
               ...state,
               dogs: [...state.dogs].sort((a, b) => a.nombre.localeCompare(b.nombre))
            };
         } else if (payload === 'Z-A') {
            return {
               ...state,
               dogs: [...state.dogs].sort((a, b) => b.nombre.localeCompare(a.nombre)),
            };
         } else {
            return state;
         };
      case SORTING_BY_WEIGHT:
         if (payload === 'ASC') {
            return {
               ...state,
               dogs: [...state.dogs].sort((a, b) => a.peso.localeCompare(b.peso))
            };
         }
            else if (payload === 'DESC') {
            return {
               ...state,
               dogs: [...state.dogs].sort((a, b) => b.peso.localeCompare(a.peso)),
            };
         } else {
            return state;
         };
      case CREATE_DOG:
         return {
            ...state,
            dogs: payload
         };
      case MOVING_PAGE:
         
         const nextPage = state.currentPage + 1;
         const prevPage = state.currentPage - 1;
         const index = payload === 'next' ? nextPage * itemsXpage
            : prevPage * itemsXpage
         
         if (payload === 'next' && index >= state.dogsBackUp.length) return state
         else if (payload === 'prev' && prevPage < 0) return state

         return {
            ...state,
            dogs: [...state.dogsBackUp].splice(index, itemsXpage),
            currentPage: payload === 'next' ? nextPage : prevPage
         };
      default:
         return {
            ...state
         }
   };
}

