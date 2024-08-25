const up = (queryInterface, sequelize) => queryInterface.createTable('verification_codes', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: sequelize.INTEGER
  },
  userId: {
    type: sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE', // Ensure cascading delete
  },
  value: {
    type: sequelize.STRING
  },
  createdAt: {
    type: sequelize.DATE,
  },
  updatedAt: {
    type: sequelize.DATE,
  },
});
const down = (queryInterface) => queryInterface.dropTable('verification_codes');

export default {
  up,
  down
}
