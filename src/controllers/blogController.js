import blogService from "../utils/db/blogDB"
import paginator from "../utils/paginator"

/* eslint-disable require-jsdoc */
class blogController {
  static async getAllBlogs(req, res) {
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 5
    const blogs = await blogService.findAllBlogs(page, limit)
    const pagData = paginator(blogs, page, limit)
    res.json({
      status: 200,
      message: "request was successful",
      data: pagData
    })
  }

  static async getOneBlog(req, res) {
    const blog = await blogService.findOneBlog(req.params.id)
    res.json({
      status: 200,
      message: 'request was successful',
      blog
    })
  }
}

export default blogController
