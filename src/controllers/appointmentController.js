import appointmentDB from "../utils/db/appointmentDB"
import paginator from "../utils/paginator"

/* eslint-disable require-jsdoc */
class appointmentController {
  static async getAllAppointments(req, res) {
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 5
    const appointment = await appointmentDB.findAllAppointments()
    const paginated = paginator(appointment, page, limit)
    res.json({
      status: 200,
      message: "success",
      data: paginated
    })
  }

  static async postAppointment(req, res) {
    const entry = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      type: req.body.type,
      price: req.body.price
    }
    try {
      const appointment = await appointmentDB.saveAppointment(entry)
      res.json({
        status: 200,
        message: "appointment saved"
      })
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err
      })
    }
  }

  static async updateAppointment(req, res) {
    const value = req.query.value
    const id = req.params.id
    await appointmentDB.updateIsCompleted(value, id)
    res.json({
      status: 200,
      message: "updated successfully"
    })
  }

  static async deleteAppointment(req, res) {
    const id = req.params.id
    await appointmentDB.deleteAppointment(id)
    res.json({
      status: 200,
      message: "appointment deleted successfully"
    })
  }
}

export default appointmentController
