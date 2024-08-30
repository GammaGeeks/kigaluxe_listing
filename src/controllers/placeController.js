/* eslint-disable require-jsdoc */
import placeDB from '../utils/db/placeBD'
import paginator from '../utils/paginator'

class placeController {
  static async updatePlace(req, res) {
    // initialising variables we need
    const id = req.params.id
    const value = req.query.value
    const column = req.query.column

    // handling emptyness scenarios
    if (!value) {
      return res.status(403).json({
        status: 403,
        error: 'value can\'t be empty'
      })
    }

    if (!column) {
      return res.status(403).json({
        status: 403,
        error: 'column can\' be empty'
      })
    }

    try {
      await placeDB.updatePlace(id, column, value)
      res.json({
        status: 200,
        message: `${column} updated successfully`
      })
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      })
    }
  }
}

export default placeController
