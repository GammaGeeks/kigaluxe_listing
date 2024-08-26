const up = (queryInterface, Sequelize) => queryInterface.createTable('places', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  province: {
    type: Sequelize.STRING,
  },
  district: {
    type: Sequelize.STRING
  },
  sector: {
    type: Sequelize.STRING
  },
  knownName: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  img: {
    type: Sequelize.STRING
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
const down = (queryInterface) => queryInterface.dropTable('places');
export { up, down };
