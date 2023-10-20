const {
   getAllDogs,
   getById,
   getByName,
   getAllTemperaments,
   getDogByTemperament
} = require('../controllers/getController');

const getAllDogsHandler = async (req, res) => {
   try {
      const allDogs = await getAllDogs();
      return res.status(200).json(allDogs)
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
};

const getDogByIdHandler = async (req, res) => {
   try {
      const { id } = req.params;
      if (!id) {
         return res.status(404).json({ error: `Please provide an id` })
      }
      else {
         const dogFound = await getById(id);
         if (!dogFound) {
            return res.status(404).json({ error: `Dog by the id ${id} wasnt found` })
         }
         return res.status(200).json(dogFound)
      }
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
};

const getDogByNameHandler = async (req, res) => {
   try {
      const { name } = req.query;
      if (!name) {
         return res.status(404).json({ error: `Please provide an name` })
      }
      else {
         const dogFound = await getByName(name);
         if (!dogFound) {
            return res.status(404).json({ error: `Dog by the name ${name} wasnt found` })
         }
         return res.status(200).json(dogFound)
      }
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
};

const getAllTemperamentsHandler = async (req, res) => {
   try {
      const allTemperaments = await getAllTemperaments();
      return res.status(200).json(allTemperaments)
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
};

const getDogByTemperamentHandler = async (req, res) => {
   try {
      const { temperament } = req.params;
      if (!temperament) {
         return res.status(404).json({ error: `Please provide an temperament` })
      }
      else {
         const dogFound = await getDogByTemperament(temperament);
         if (!dogFound) {
            return res.status(404).json({ error: `Dog by the temperament ${temperament} wasnt found` })
         }
         return res.status(200).json(dogFound)
      }
   } catch (error) {
      return res.status(500).json({ error: error.message })
   }
};

module.exports = {
   getAllDogsHandler,
   getDogByIdHandler,
   getDogByNameHandler,
   getAllTemperamentsHandler,
   getDogByTemperamentHandler
}