
const {createDog} = require('../controllers/postController.js')

const createDogHandler = async (req, res) => {
   try {
      const { imagen, nombre, altura, peso, añosDeVida, temperamento } = req.body;
      
      if (!imagen || !nombre || !altura || !peso || !añosDeVida || !temperamento) {
         return res.status(400).json({ error: 'Please, provide the complete information' });
      }
      else {
         const creating = await createDog(imagen, nombre, altura, peso, añosDeVida, temperamento);
         return res.status(201).json({creating});
      }
   } catch (error) {
      return res.status(500).json({error: error.message})
   }
}

module.exports = {
   createDogHandler
}