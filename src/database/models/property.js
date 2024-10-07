const propertyDefinition = (sequelize, DataTypes) => {
  const property = sequelize.define('property', {
    title: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER },
    imageIds: { type: DataTypes.ARRAY(DataTypes.STRING) },
    details: { type: DataTypes.TEXT },
    price: { type: DataTypes.INTEGER },
    property_type: { type: DataTypes.INTEGER },
    property_size: { type: DataTypes.INTEGER },
    hasParking: { type: DataTypes.BOOLEAN },
    isForSale: { type: DataTypes.BOOLEAN },
    isForRent: { type: DataTypes.BOOLEAN },
    isLand: { type: DataTypes.BOOLEAN },
    location: { type: DataTypes.INTEGER },
    bedrooms: { type: DataTypes.INTEGER },
    bathrooms: { type: DataTypes.INTEGER },
    isSold: { type: DataTypes.BOOLEAN },
    hasPool: { type: DataTypes.BOOLEAN },
    appliances: { type: DataTypes.ARRAY(DataTypes.STRING) },
    yearBuilt: { type: DataTypes.DATE },
    AC: { type: DataTypes.BOOLEAN },
    YTUrl: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  property.associate = (models) => {
    property.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });
    property.belongsTo(models.category, {
      foreignKey: 'property_type',
      as: 'type',
      onDelete: 'CASCADE',
    });
    property.belongsTo(models.place, {
      foreignKey: 'location',
      as: 'place',
      onDelete: 'CASCADE'
    });
    property.hasMany(models.rating, {
      foreignKey: 'propertyId',
      as: 'ratings',
      onDelete: 'CASCADE'
    });
  }

  return property;
};

export default propertyDefinition;
