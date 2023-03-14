'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      likes.belongsTo(models.places); // likes esta asociado a places
      likes.belongsTo(models.users);
    }
  }
  likes.init({
    isLike: DataTypes.BOOLEAN,
    placeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'likes',
  });
  return likes;
};