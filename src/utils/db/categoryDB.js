/* eslint-disable require-jsdoc */
import { Sequelize } from 'sequelize';
import models from '../../database/models';

const { category, property } = models;

class categoryDB {
  static async getAllCategories() {
    const newCategories = await category.findAll({
      order: [['id', 'ASC']],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    return newCategories
  }
}

export default categoryDB
