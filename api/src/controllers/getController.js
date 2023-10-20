const { Dogs, Temperaments } = require('../db');
const axios = require('axios');
const {API_KEY} = process.env



const dogsApi = async () => {
   try {
      const dogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
      const allDogsApi = dogs.data;
   
      const cleanData = allDogsApi.map((dog) => {
         return {
            id: dog.id,
            nombre: dog.name,
            imagen: dog.image.url,
            altura: dog.height.metric,
            peso: dog.weight.metric,
            añosDeVida: dog.life_span,
            temperamento: dog.temperament
         }
      });
      return cleanData;
   }
   catch (error) {
      throw error;
   }
};

const dogsDb = async () => {
   try {
      const dogsFound = await Dogs.findAll({
         include: {
            model: Temperaments,
            attributes: ['nombre'],
            through: { attributes: [] }
         }
      });
      const dogsAfterMap = dogsFound.map((dog) => {
         return {
            id: dog.id,
            nombre: dog.nombre,
            imagen: dog.imagen,
            altura: dog.altura,
            peso: dog.peso,
            añosDeVida: dog.añosDeVida,
            temperamento: dog.temperaments.map((temp)=>temp.nombre).join(', ')
         };
      });
      return dogsAfterMap;
   } catch (error) {
      throw error;
   }
};

const getAllDogs = async () => {
   const dogsApiData = await dogsApi();
   const dogsDbData = await dogsDb();

   
   const dogs = [...dogsApiData, ...dogsDbData];

   return dogs;
};

const getById = async (id) => {
   try {
      const dogsToSearch = await getAllDogs();
      const dogFound = dogsToSearch.find((dog) => dog.id == id);
      if (dogFound) {
         return dogFound;
      }
      else {
         return `Dog doesnt found by the id ${id} `
      }
   } catch (error) {
      throw error;
   }
   
};


const getByName = async (name) => {
   try {
      const dogsToSearch = await getAllDogs();
      const nameToSearch = name.toLowerCase();
   
      const dogsFound = dogsToSearch.filter((dog) => dog.nombre.toLowerCase().includes(nameToSearch));

      if (dogsFound.length > 0) {
         return dogsFound;
      }
      else {
         return `Dog doesnt found by the name ${name} `
      }
   } catch (error) {
      throw error;
   }
};

const getAllTemperaments = async () => {
   try {
      const dogsInfo = await getAllDogs();
      
      const temperamentos = dogsInfo.map((dog) => dog.temperamento).filter((temperamento) => temperamento).join(', ');
      

      const temperamentosUnicos = [...new Set(temperamentos.split(', '))];

      const temperamentsData = await Temperaments.bulkCreate(
         temperamentosUnicos.map((nombre) => ({ nombre }))
      );
      return temperamentsData;
      
   } catch (error) {
      throw error;
   }
};

const getDogByTemperament = async (temperament) => {
   try {
      const dogsToSearch = await getAllDogs();
      const temperamentToSearch = temperament.toLowerCase();
   
      const dogsFound = dogsToSearch.filter((dog) => {
         if (dog.temperamento) {
            return dog.temperamento.toLowerCase().includes(temperamentToSearch);
         }
         return false;
      });

      if (dogsFound.length > 0) {
         return dogsFound;
      }
      else {
         return `Dog doesnt found by the name ${temperament} `
      }
   } catch (error) {
      throw error;
   }
};

module.exports = {
   getAllDogs,
   getById,
   getByName,
   getAllTemperaments,
   getDogByTemperament
}