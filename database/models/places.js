'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class places extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      places.belongsTo(models.addresses); // un lugar pertenece a un lugar
      places.belongsTo(models.users); // un lugar puede ser creado por un usuario
      places.hasMany(models.comments); // un lugar puede tener muchos comentarios
      places.hasMany(models.likes); // un lugar puede tener muchos likes
    }
  }
  places.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    addressId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'places',
  });
  return places;
};