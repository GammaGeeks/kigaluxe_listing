const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('ratings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    propertyId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'properties',
        key: 'id'
      },
      allowNull: false
    },
    rates: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      }
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
