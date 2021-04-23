module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      cpf: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },

      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'permissions',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
      },
      
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('users')
  }
};

