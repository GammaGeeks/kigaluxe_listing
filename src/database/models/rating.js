const ratingDefinition = (sequelize, DataTypes) => {
  const rating = sequelize.define('rating', {
    email: { type: DataTypes.STRING },
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
    })
  }

  return rating;
};

export default ratingDefinition;
