const commentDefinition = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    userId: { type: DataTypes.INTEGER },
    blogId: { type: DataTypes.INTEGER },
    content: { type: DataTypes.TEXT },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {})

  comment.associate = (models) => {
    comment.belongsTo(models.blog, {
      foreignKey: 'blogId',
      as: 'blog',
      onDelete: 'CASCADE'
    });
    comment.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    })
  }

  return comment
}

export default commentDefinition
