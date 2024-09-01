/* eslint-disable require-jsdoc */
import crypto from 'crypto'
import placeDB from '../utils/db/placeBD'
import paginator from '../utils/paginator'
import s3_helper from '../utils/s3_helper'

class placeController {
  /*
***********************************************************************************************************
------------------------------- getAllPlace controller ---------------------------------------------------
***********************************************************************************************************
*/
  static async getAllPlace(req, res) {
    // initializing the variables
    const page = req.query.page || 1
    const limit = req.query.limit || 10

    const allPlaces = await placeDB.getAllPlace()
    const urls = await Promise.all(allPlaces.map((place) => s3_helper.generateUrl(place.img)))
    const updated = allPlaces.map((element, index) => {
      const holder = element.toJSON()
      holder.url = urls[index]
      return holder
    })

    res.json({
      status: 200,
      places: paginator(updated, page, limit)
    })
  }

  /*
***********************************************************************************************************
------------------------------- createPlace controller ---------------------------------------------------
***********************************************************************************************************
*/

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

  /*
***********************************************************************************************************
---------------------------------- updatePlace controller -----------------------------------------------
***********************************************************************************************************
*/

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

  /*
***********************************************************************************************************
------------------------------- deletePlace controller ---------------------------------------------------
***********************************************************************************************************
*/

  static async deleteAPlace(req, res) {
    const { id } = req.params
    if (!await placeDB.findPlaceById(id)) {
      return res.status(404).json({
        status: 404,
        error: `no place with id:${id} found`
      })
    }
    const place = await placeDB.findPlaceById(id)
    await s3_helper.deleteObject(place.img)
    const isDeleted = await placeDB.deletePlace(id)
    if (isDeleted) {
      res.json({
        status: 200,
        message: `the place with id:${id} is deleted successfully`
      })
    }
  }

  /*
***********************************************************************************************************
------------------------------- addPlaceImg controller ---------------------------------------------------
***********************************************************************************************************
*/

  static async addPlaceImg(req, res) {
    const id = req.params.id
    const files = req.files[0]

    if (!await placeDB.findPlaceById(id)) {
      return res.status(404).json({
        status: 404,
        error: `no place with id:${id} found`
      })
    }

    if (!files || files.length === 0) {
      return res.status(400).json({
        status: 400,
        error: "No files were uploaded"
      });
    }
    const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
    const place = await placeDB.findPlaceById(id)
    const key = (!place.img) ? `${randomImageName()}` : place.img
    try {
      await s3_helper.s3_objPut(key, files.buffer, files.mimetype)
      await placeDB.updatePlace(id, 'img', key)
      res.json({
        status: 200,
        message: 'image added successfully'
      })
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'failure',
        error
      })
    }
  }
}

export default placeController
