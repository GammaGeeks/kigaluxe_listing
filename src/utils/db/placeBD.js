/* eslint-disable require-jsdoc */
import { Sequelize } from 'sequelize';
import models from '../../database/models';

const { place, property } = models;

class placeDB {
  static async getAllPlace() {
    const newPlace = await place.findAll({
      order: [['id', 'ASC']],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    return newPlace
  }

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
      { [column]: value, updatedAt: new Date() },
      { where: { id } })
    return updated
  }

  static async findPlaceById(id) {
    const newPlace = await place.findOne({
      where: { id },
      include:
      [
        {
          model: property,
          as: 'properties',
          attributes: {
            include: [
              [
                Sequelize.literal(
                  `CONCAT("place"."district", ' - ', "place"."sector", ' - ' ,"place"."knownName")`
                ),
                'location'
              ],
            ]
          },
        },
      ]
    })
    return newPlace
  }

  static async deletePlace(id) {
    const newPlace = await place.destroy({ where: { id } })
    return newPlace
  }
}
export default placeDB
