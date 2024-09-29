/* eslint-disable require-jsdoc */
import { string } from 'joi'
import categoryDB from '../utils/db/categoryDB'
import paginator from '../utils/paginator'

class CategoriesController {
  /*
***********************************************************************************************************
------------------------------- getAllCategories controller ---------------------------------------------------
***********************************************************************************************************
*/
  static async getAllCategories(req, res) {
    // initializing the variables
    const page = req.query.page || 1
    const limit = req.query.limit || 10

    const allCategories = await categoryDB.getAllCategories()

    res.json({
      status: 200,
      message: 'categories found',
      data: paginator(allCategories, page, limit)
    })
  }

  /*
***********************************************************************************************************
------------------------------- getAllCategories controller ---------------------------------------------------
***********************************************************************************************************
*/
  static async postCategory(req, res) {
    // getting input from user
    const { name, details } = req.body

    // exiting function if name is empty to avoid nulls
    if (!name) {
      return res.status(403).json({
        status: 403,
        error: 'name can\'t be empty'
      })
    }

    const entry = { name, details }
    const category = await categoryDB.addCategory(entry)

    if (category) {
      return res.status(201).json({
        status: 201,
        message: 'category created successfully'
      })
    }
  }
}

export default CategoriesController
