const tokenDefinition = (sequelize, DataTypes) => {
  const token = sequelize.define('token', {
    value: { type: DataTypes.TEXT },
    userId: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  token.associate = (models) => {
    token.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };

  return token;
};

export default tokenDefinition
