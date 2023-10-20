const { Dogs, Temperaments } = require('../db');

const createDog = async ( imagen, nombre, altura, peso, añosDeVida, temperamento) => {
   try {
      const verify = await Dogs.findOne({
         where: { nombre: nombre }
      });

      if (verify) {
         return `Ya existe un perro creado por el nombre ${nombre}`;
      }
      else {
         const relatedTemperament = await Temperaments.findAll({
            where: { nombre: temperamento }
         });
         
         if (!relatedTemperament) {
            return `El temperamento ${temperamento} no existe en la base de datos`
         }

         const createdDog = await Dogs.create({
            imagen,
            nombre,
            altura,
            peso,
            añosDeVida,
         });
   
         await createdDog.setTemperaments(relatedTemperament);
   
         return {
            message: 'Dog created successfully',
            dog: {
               id: createdDog.id,
               nombre: createdDog.nombre,
               imagen: createdDog.imagen,
               altura: createdDog.altura,
               peso: createdDog.peso,
               añosDeVida: añosDeVida.añosDeVida,
               temperamento: relatedTemperament[0].nombre
            },
         };
      }
      
   } catch (error) {
      throw error;
   }
}

module.exports = {
   createDog
}