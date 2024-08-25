const codeDefinition = (sequelize, DataTypes) => {
  const verification_code = sequelize.define('verification_code', {
    userId: { type: DataTypes.INTEGER },
    value: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  verification_code.associate = (models) => {
    verification_code.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return verification_code;
};

export default codeDefinition
