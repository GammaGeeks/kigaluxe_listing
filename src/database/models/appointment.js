const appointmentDefinition = (sequelize, DataTypes) => {
  const appointment = sequelize.define('appointment', {
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.TEXT },
    email: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.INTEGER },
    type: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER },
    isCompleted: { type: DataTypes.BOOLEAN },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {})

  appointment.associate = (models) => {
    appointment.belongsTo(models.category, {
      foreignKey: 'type',
      as: 'typeof',
      onDelete: 'CASCADE'
    })
  }
  return appointment
}

export default appointmentDefinition
