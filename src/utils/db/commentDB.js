/* eslint-disable require-jsdoc */
import { where } from 'sequelize';
import models from '../../database/models';

const { comment } = models;

class commentDB {
  static async addComment(entry) {
    try {
      const newComment = await comment.create({
        ...entry,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return newComment;
    } catch (error) {
      console.error('Error saving comment:', error);
      throw error; // Re-throw the error for upper layers to handle
    }
  }

  static async editComment(id, userId, content) {
    try {
      const newComment = await comment.update(
        { content },
        { where: { id, userId } }
      )
      return newComment
    } catch (error) {
      return error
    }
  }

  static async deleteC(id, userId) {
    const newComment = await comment.destroy({ where: { id, userId } })
    return newComment
  }
}

export default commentDB
