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

  static async addBlog(req, res) {
    const authorId = req.user.id
    const { title, content, categoryId } = req.body

    if (!title) {
      return res.status(403).json({
        status: 403,
        error: 'title can\'t be empty'
      })
    }

    if (!content) {
      return res.status(403).json({
        status: 403,
        error: 'content can\'t be empty'
      })
    }

    try {
      await blogService.createBlog({ title, content, categoryId, authorId })
      res.json({
        status: 200,
        message: 'blog added successfully'
      })
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      })
    }
  }
}

export default blogController
