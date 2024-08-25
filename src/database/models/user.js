const userDefinition = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    profileImg: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {});

  user.associate = (models) => {
    user.hasMany(models.blog, {
      foreignKey: 'authorId',
      as: 'blogs',
      onDelete: 'CASCADE',
    })

    // user.hasMany(models.property, {
    //   foreignKey: 'userId',
    //   as: 'properties',
    //   onDelete: 'CASCADE',
    // })
    // user.hasOne(models.token, {
    //   foreignKey: 'userId',
    //   as: 'token',
    //   onDelete: 'CASCADE',
    // })
  }
  return user;
};

export default userDefinition
