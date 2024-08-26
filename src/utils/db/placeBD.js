/* eslint-disable require-jsdoc */
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
}

export default placeDB
