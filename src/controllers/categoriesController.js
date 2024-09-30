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
------------------------------- postCategory controller ---------------------------------------------------
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
    const category = await categoryDB.addCategory(entry) // saving a category

    // making sure a category is saved
    if (category) {
      return res.status(201).json({
        status: 201,
        message: 'category created successfully'
      })
    }
  }

  /*
***********************************************************************************************************
------------------------------- deleteCategory controller ---------------------------------------------------
***********************************************************************************************************
*/

  static async deleteCategory(req, res) {
    const { id } = req.params
    if (!id) {
      return res.status(403).json({
        status: 403,
        error: "id can/'t be empty"
      })
    }
    if (!await categoryDB.findOneCategory(id)) {
      return res.status(404).json({
        status: 404,
        error: 'no category found with that id'
      })
    }
    const category = await categoryDB.deleteCategory(id)
    if (category) {
      return res.status(200).json({
        status: 200,
        message: 'category deleted successfully'
      })
    }
  }
}

export default CategoriesController
