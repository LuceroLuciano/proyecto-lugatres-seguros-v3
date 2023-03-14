'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isLike: {
        type: Sequelize.BOOLEAN
      },
      placeId: {
        type: Sequelize.INTEGER,
        references: {
          model:'places',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model:'places',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      },
      statusDelete: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('likes');
  }
};