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
      data: paginator(allCategories, page, limit)
    })
  }
}

export default CategoriesController
