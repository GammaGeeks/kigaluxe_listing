import crypto from 'crypto'
import blogService from "../utils/db/blogDB"
import paginator from "../utils/paginator"
import s3_helper from "../utils/s3_helper"

/* eslint-disable require-jsdoc */
class blogController {
  static async getAllBlogs(req, res) {
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 5
    const blogs = await blogService.findAllBlogs()
    const urls = await Promise.all(blogs.map((element) => {
      element.url = s3_helper.newLevelUrl(element.featuredImg)
      return element.url
    }))
    const nBlogs = blogs.map((element, index) => {
      element.toJSON()
      element.dataValues.url = urls[index]
      return element
    })
    const pagData = paginator(nBlogs, page, limit)
    res.json({
      status: 200,
      message: "request was successful",
      data: pagData
    })
  }

  static async getOneBlog(req, res) {
    let blog = await blogService.findOneBlog(req.params.id)
    blog = blog.toJSON()
    blog.url = await s3_helper.newLevelUrl(blog.featuredImg)
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

    if (!categoryId) {
      return res.status(403).json({
        status: 403,
        error: 'categoryId can\'t be empty'
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

  static async blogUpdate(req, res) {
    const id = req.params.id
    const { column, value } = req.body

    if (!await blogService.findOneBlog(id)) {
      return res.status(404).json({
        status: 404,
        error: 'no blog with that id found'
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
      const blog = await blogService.updateBlog(id, column, value)
      if (!blog[0]) {
        return res.status(403).json({
          status: 403,
          error: `${column} not saved`
        })
      }
      res.status(201).json({
        status: 201,
        message: `the ${column} has been updated successfully`
      })
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      })
    }
  }

  static async deleteBlog(req, res) {
    const id = req.params.id
    const checkBlog = await blogService.findOneBlog(id)

    if (!checkBlog) {
      return res.status(404).json({
        status: 404,
        error: 'no blog with that id found'
      })
    }

    try {
      await blogService.deleteB(id)
      if (checkBlog.featuredImg) {
        await s3_helper.deleteObject(checkBlog.featuredImg)
      }

      res.json({
        status: 200,
        message: `blog with id:${id} deleted successfully`
      })
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      })
    }
  }

  static async addImg(req, res) {
    const id = req.params.id
    const file = req.files[0]
    const blog = await blogService.findOneBlog(id)
    const randomImageName = (bytes = 12) => crypto.randomBytes(bytes).toString('hex');

    if (!blog) {
      return res.status(404).json({
        status: 404,
        error: `no place with id:${id} found`
      })
    }

    if (!file || file.length === 0) {
      return res.status(400).json({
        status: 400,
        error: "No files were uploaded"
      });
    }

    const key = (!blog.featuredImg) ? `blog/${id}-${randomImageName()}` : blog.featuredImg

    try {
      await s3_helper.s3_objPut(key, file.buffer, file.mimetype)
      await blogService.updateBlog(id, 'featuredImg', key)
      res.json({
        status: 200,
        message: 'img added successfully'
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
