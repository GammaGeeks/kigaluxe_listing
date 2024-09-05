const blogDefinition = (sequelize, DataTypes) => {
  const blog = sequelize.define('blog', {
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    authorId: { type: DataTypes.INTEGER },
    categoryId: { type: DataTypes.INTEGER },
    featuredImg: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  }, {})

  blog.associate = (models) => {
    blog.belongsTo(models.user, {
      foreignKey: 'authorId',
      as: 'author',
      onDelete: 'CASCADE'
    });
    blog.hasMany(models.comment, {
      foreignKey: 'blogId',
      as: 'comments',
      onDelete: 'CASCADE'
    })
  }

  return blog
}

export default blogDefinition
