/* eslint-disable require-jsdoc */
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
}

export default rateDB
