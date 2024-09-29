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

  static async addCategory(entry) {
    const newCategory = await category.create({
      ...entry,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })

    return newCategory
  }
}

export default categoryDB
