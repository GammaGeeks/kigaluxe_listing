/* eslint-disable require-jsdoc */
import commentDB from "../utils/db/commentDB";

class commentContoller {
  static async postingComment(req, res) {
    const { blogId } = req.params
    const userId = req.user.id
    const { content } = req.body
    const comment = { userId, blogId, content }
    try {
      const test = await commentDB.addComment(comment)
      res.json({
        status: 200,
        message: "comment created successfully",
        test
      })
    } catch (error) {
      res.status(500).json({
        status: 500,
        error
      })
    }
  }

  static async putComment(req, res) {
    const id = req.params.id
    const content = req.body.content
    const userId = req.user.id
    const newComment = await commentDB.editComment(id, userId, content)
    if (!newComment[0]) {
      return res.status(404).json({
        status: 404,
        error: "wrong id"
      })
    }
    res.json({
      status: 200,
      message: "comment updated successfully"
    })
  }

  static async deleteComment(req, res) {
    const id = req.params.id
    const userId = req.user.id
    const newComment = await commentDB.deleteC(id, userId)
    if (!newComment) {
      return res.status(404).json({
        status: 404,
        error: "wrong id"
      })
    }
    res.json({
      status: 200,
      message: "comment deleted successfully"
    })
  }
}

export default commentContoller
