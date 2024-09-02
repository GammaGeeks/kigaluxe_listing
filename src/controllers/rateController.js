import rateDB from "../utils/db/rateDB"

/* eslint-disable require-jsdoc */
class rateController {
  static async addRate(req, res) {
    const propertyId = req.params.propId
    const { email, rates } = req.body

    if (!email) {
      return res.status(403).json({
        status: 403,
        error: 'an email can\'t be empty'
      })
    }

    if (!rates || rates > 6) {
      return res.status(403).json({
        status: 403,
        error: 'a rate can\'t empty or greater than 5'
      })
    }

    const checkRate = await rateDB.findRateByEmailAndId(email, propertyId)

    try {
      if (!checkRate) {
        await rateDB.createRate({ propertyId, email, rates })
        res.json({
          status: 200,
          message: 'rate saved successfully',
        })
      } else {
        await rateDB.rateUpdate(checkRate.id, rates)
        res.json({
          status: 200,
          message: 'rate updated successfully',
        })
      }
    } catch (error) {
      res.status({
        status: 500,
        error
      })
    }
  }
}

export default rateController
