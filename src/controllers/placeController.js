/* eslint-disable require-jsdoc */
import placeDB from '../utils/db/placeBD'
import paginator from '../utils/paginator'

class placeController {
  static async getAllPlace(req, res) {
    // initializing the variables
    const page = req.query.page || 1
    const limit = req.query.limit || 10

    const allPlaces = await placeDB.getAllPlace()

    res.json({
      status: 200,
      places: paginator(allPlaces, page, limit)
    })
  }

  static async createPlace(req, res) {
    const { province, district, sector, knownName, description } = req.body
    const entry = { province, district, sector, knownName, description }
    const isSaved = await placeDB.addPlace(entry)
    if (isSaved) {
      return res.json({
        status: 200,
        message: 'place created successfully'
      })
    }
  }

  static async updatePlace(req, res) {
    // initialising variables we need
    const id = req.params.id
    const value = req.query.value
    const column = req.query.column

    // handling emptyness scenarios
    if (!await placeDB.findPlaceById(id)) {
      return res.status(404).json({
        status: 404,
        error: `no place with id:${id} found`
      })
    }
    if (!value) {
      return res.status(403).json({
        status: 403,
        error: 'value can\'t be empty'
      })
    }

    if (!column) {
      return res.status(403).json({
        status: 403,
        error: 'column can\'t be empty'
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

  static async deleteAPlace(req, res) {
    const { id } = req.params
    if (!await placeDB.findPlaceById(id)) {
      return res.status(404).json({
        status: 404,
        error: `no place with id:${id} found`
      })
    }
    const isDeleted = await placeDB.deletePlace(id)
    if (isDeleted) {
      res.json({
        status: 200,
        message: `the place with id:${id} is deleted successfully`
      })
    }
  }
}

export default placeController
