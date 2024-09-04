/* eslint-disable require-jsdoc */
import { where } from 'sequelize';
import models from '../../database/models';

const { blog, comment, user, sequelize } = models;

class blogService {
  static async findAllBlogs() {
    const blogs = await blog.findAll({
      order: [
        ['id', 'ASC']
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM comments AS comment
                    WHERE
                    comment."blogId" = blog.id
                  )`),
            'commentCount'
          ]
        ]
      },
      group: ['blog.id'],
    });
    return blogs;
  }

  static async findOneBlog(id) {
    const currentBlog = await blog.findOne({
      where: { id },
      include: [{
        model: comment,
        as: 'comments',
        attributes: ["content"],
        include: [{
          model: user,
          as: 'user',
          attributes: ['firstName', 'lastName']
        }]
      }] })
    return currentBlog
  }

  static async createBlog(entry) {
    try {
      const newBlog = await blog.create({
        ...entry,
        savedId: 0,
        likes: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return newBlog
    } catch (error) {
      return error.message
    }
  }

  static async updateBlog(id, column, value) {
    try {
      const newBlog = await blog.update(
        { [column]: value, updatedAt: new Date() },
        { where: { id } }
      )
      return newBlog
    } catch (error) {
      return error.message
    }
  }

  static async deleteB(id) {
    try {
      await blog.destroy({ where: { id } })
    } catch (error) {
      return error.message
    }
  }
}

export default blogService
