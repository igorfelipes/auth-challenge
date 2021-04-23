module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      permission: {
        type: Sequelize.STRING,
        allowNull: false,
      },   
  
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('permissions')
  }
};

