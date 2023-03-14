'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      addressId: {
        type: Sequelize.INTEGER,
        // asociación con el modelo al que desamos hacer la relación
        references: {
          model:'addresses',
          key:'id'
        },
        onDelete:'CASCADE', // metodo para borrar en caso de que se elimine un campo
        onUpdate:'CASCADE', //metodo para actualizar en caso de que se elimine un campo
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model:'users',
          key:'id'
        },
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
      },
      statusDelete: {
        allowNull: false,
        defaultValue: false, // indica que el status delete va a ser false por default
        type: Sequelize.BOOLEAN,        
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
    await queryInterface.dropTable('places');
  }
};