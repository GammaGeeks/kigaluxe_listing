import { Sequelize, where } from 'sequelize';
import models from '../../database/models';

const { place, property, category, user, rating } = models;
/* eslint-disable require-jsdoc */

class propertiesDB {
  static async getAllProperties() {
    const holder = await property.findAll({
      order: [['id', 'ASC']],
      where: { isSold: false, isForSale: true },
      include: [
        {
          model: category,
          as: 'type',
          attributes: ['id', 'name'],
          required: true
        },
        {
          model: place,
          as: 'place',
          attributes: ['id', 'province', 'district', 'sector', 'knownName'],
          required: true
        },
        {
          model: rating,
          as: 'ratings',
          attributes: [], // No need for individual rating fields
          required: false // Allow properties without ratings
        }
      ],
      attributes: {
        include: [
          [Sequelize.col('type.name'), 'property_type'],
          [
            Sequelize.literal(
              `CONCAT("place"."district", ' - ', "place"."sector", ' - ' ,"place"."knownName")`
            ),
            'location'
          ],
          [
            Sequelize.fn(
              'ROUND',
              Sequelize.fn('COALESCE', Sequelize.fn('AVG', Sequelize.col('ratings.rates')), 0),
              1
            ),
            'rates'
          ]
        ]
      },
      group: [
        'property.id',
        'type.id',
        'type.name',
        'place.id',
        'place.province',
        'place.district',
        'place.sector',
        'place.knownName'
      ],
    });
    return holder;
  }

  static async saveProperty(entry) {
    try {
      const newProperty = await property.create({
        ...entry,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return newProperty;
    } catch (error) {
    // Handle the error, e.g., log it, throw a custom error, etc.
      console.error('Error saving property:', error);
      throw error; // Re-throw the error for upper layers to handle
    }
  }

  static async updateProperty(id, column, value) {
    const updatedProperty = await property.update(
      { [column]: value },
      { where: { id } }
    );
    return updatedProperty;
  }

  static async findProperty(column, value) {
    const holder = await property.findAll({
      where: { [column]: value },
      include: [
        {
          model: category,
          as: 'type',
          attributes: [],
          required: true
        },
        {
          model: place,
          as: 'place',
          attributes: [],
          required: true
        }],
      attributes: [
        'id', 'title', 'details',
        [Sequelize.col('type.name'), 'property_type'],
        [
          Sequelize.literal(
            `CONCAT("place"."district", ' - ', "place"."sector", ' - ' ,"place"."knownName")`
          ),
          'location'
        ], 'price', 'hasParking', 'isForSale', 'isForRent', 'bedrooms', 'bathrooms', 'imageIds'
      ]
    });
    return holder
  }

  static async searchProperty(location, property_type, price, property_size) {
    const holder = await property.findAll({
      where: {
        [Sequelize.Op.or]: [
        //  { location: { [Sequelize.Op.iLike]: `%${location}%` } },
        //   { property_type: { [Sequelize.Op.between]: property_type } },
          { price: { [Sequelize.Op.between]: price } },
          { property_size: { [Sequelize.Op.between]: property_size } }
        ]
      }
    });
    return holder
  }

  static async deleteProperty(id) {
    await property.destroy({ where: { id } });
  }

  static async findAllRecords(skip, start) {
    const record = await property.findAndCountAll({
      limit: skip,
      offset: start,
      // where: { approved: true },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: user,
          as: 'user',
          attributes: [
            'id',
            'firstname',
            'lastname',
            'profileImg',
            'createdAt',
            'updatedAt'
          ]
        },
        {
          model: category,
          as: 'type',
          attributes: ['name']
        }
      ],
      attributes: {
        include: [
          [Sequelize.col('name'), 'property_type']
        ]
      }
    })

    return record
  }
}

export default propertiesDB;
