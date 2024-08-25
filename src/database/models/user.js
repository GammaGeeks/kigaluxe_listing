const userDefinition = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    profileImg: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    isVerified: { type: DataTypes.BOOLEAN },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  user.associate = (models) => {
    user.hasMany(models.blog, {
      foreignKey: 'authorId',
      as: 'blogs',
      onDelete: 'CASCADE',
    })

    user.hasMany(models.property, {
      foreignKey: 'userId',
      as: 'properties',
      onDelete: 'CASCADE',
    })

    user.hasOne(models.verification_code, {
      foreignKey: 'userId',
      as: 'verification_code',
      onDelete: 'CASCADE',
    })
    user.hasOne(models.token, {
      foreignKey: 'userId',
      as: 'token',
      onDelete: 'CASCADE',
    })
  }
  return user;
};

export default userDefinition
