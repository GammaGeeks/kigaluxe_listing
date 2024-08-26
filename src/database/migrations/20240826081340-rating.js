const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('ratings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    propertyId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'properties',
        key: 'id'
      }
    },
    rates: {
      type: Sequelize.INTEGER
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
};

const down = async (queryInterface) => {
  await queryInterface.dropTable('ratings');
};

export { up, down };
