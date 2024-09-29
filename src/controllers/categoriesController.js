/* eslint-disable require-jsdoc */
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

  static async postCategory(req, res) {
    const { name, details } = req.body

    if (!name) {
      return res.status(403).json({
        status: 403,
        error: 'name can\'t be empty'
      })
    }
    const entry = { name, details }
    const category = await categoryDB.addCategory(entry)

    return res.status(201).json({
      status: 201,
      message: 'category created successfully'
    })
  }
}

export default CategoriesController
