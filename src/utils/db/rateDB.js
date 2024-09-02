/* eslint-disable require-jsdoc */
import model from '../../database/models'

const { rate } = model

class rateDB {
  static async createRate(entry) {
    const newRate = await rate.create({
      ...entry,
      updatedAt: new Date(),
      createdAt: new Date()
    })
  }
}

export default rateDB
