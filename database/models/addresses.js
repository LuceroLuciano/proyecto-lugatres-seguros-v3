'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      addresses.hasOne(models.places); // una dirección le pertenece a un solo lugar
    }
  }
  addresses.init({
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    suburb: DataTypes.STRING,
    street: DataTypes.STRING,
    postal_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'addresses',
  });
  return addresses;
};