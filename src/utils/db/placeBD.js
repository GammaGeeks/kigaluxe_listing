/* eslint-disable require-jsdoc */
import { Sequelize } from 'sequelize';
import models from '../../database/models';

const { place } = models;

class placeDB {
  static async addPlace(entry) {
    try {
      const newplace = await place.create({
        ...entry,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return newplace;
    } catch (error) {
      console.error('Error saving place:', error);
      throw error; // Re-throw the error for upper layers to handle
    }
  }

  static async searchThrough(location) {
    try {
      const newPlace = await place.findAll({
        where:
          { [Sequelize.Op.or]: [
            { province: { [Sequelize.Op.iLike]: `%${location}%` } },
            { district: { [Sequelize.Op.iLike]: `%${location}%` } },
            { sector: { [Sequelize.Op.iLike]: `%${location}%` } },
            { knownName: { [Sequelize.Op.iLike]: `%${location}%` } }
          ] }
      })
      return newPlace
    } catch (error) {
      console.error('Error searching place:', error);
      throw error;
    }
  }

  static async updatePlace(id, column, value) {
    const updated = await place.update(
      { [column]: value },
      { where: { id } })
    return updated
  }
}
export default placeDB
