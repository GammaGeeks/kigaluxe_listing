import rateDB from "../utils/db/rateDB"

/* eslint-disable require-jsdoc */
class rateController {
  static async addRate(req, res) {
    const propertyId = req.params.propId
    const { email, rates } = req.body

    try {
      const newRate = await rateDB.createRate({ propertyId, email, rates })
      res.json({
        status: 200,
        message: 'rate saved successfully',
        newRate
      })
    } catch (error) {
      res.status({
        status: 500,
        error
      })
    }
  }
}

export default rateController
