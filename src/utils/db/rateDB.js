/* eslint-disable require-jsdoc */
import { where } from 'sequelize'
import model from '../../database/models'

const { rating } = model

class rateDB {
  static async createRate(entry) {
    try {
      const newRate = await rating.create({
        ...entry,
        updatedAt: new Date(),
        createdAt: new Date()
      })
      return newRate
    } catch (error) {
      return error
    }
  }

  static async findRateByEmailAndId(email, propertyId) {
    const newRate = await rating.findOne({
      where: { propertyId, email }
    })
    return newRate
  }

  static async rateUpdate(id, rates) {
    try {
      const newRate = await rating.update(
        { rates }, { where: { id }
        })
      return newRate
    } catch (error) {
      return error
    }
  }
}

export default rateDB
