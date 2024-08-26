const ratingDefinition = (sequelize, DataTypes) => {
  const rating = sequelize.define('rating', {
    userId: { type: DataTypes.INTEGER },
    propertyId: { type: DataTypes.INTEGER },
    rates: { type: DataTypes.INTEGER },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  rating.associate = (models) => {
    rating.belongsTo(models.property, {
      foreignKey: 'propertyId',
      as: 'property',
      onDelete: 'CASCADE'
    });
    rating.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });
  }

  return rating;
};

export default ratingDefinition;
