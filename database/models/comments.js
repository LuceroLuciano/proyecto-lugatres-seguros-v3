'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comments.belongsTo(models.places); // un comentario le pertenece a un lugar
      comments.belongsTo(models.users); // un comentario le pertenece a un usuario
    }
  }
  comments.init({
    comment: DataTypes.STRING,
    placeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    statusDelete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};