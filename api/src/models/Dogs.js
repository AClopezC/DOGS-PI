const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
   sequelize.define('dogs', {
      created: {
         type: DataTypes.BOOLEAN,
         defaultValue: true,
         allowNull: false
      },
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      nombre: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      imagen: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      altura: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      peso: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      añosDeVida: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
     {
         freezeTableName: true,
         timestamps: false,
  });
};
