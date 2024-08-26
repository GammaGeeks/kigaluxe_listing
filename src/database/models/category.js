const categoryDefinition = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: { type: DataTypes.STRING },
    details: { type: DataTypes.TEXT },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {})

  category.associate = (models) => {
    category.hasMany(models.property, {
      foreignKey: 'property_type',
      as: 'type',
      onDelete: 'CASCADE',
    })
  }

  return category
}

export default categoryDefinition
