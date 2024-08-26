/* eslint-disable require-jsdoc */
import models from '../../database/models';

const { appointment } = models;

class appointmentDB {
  static async findAllAppointments() {
    const allAppointments = await appointment.findAll()

    return allAppointments
  }

  static async saveAppointment(entry) {
    try {
      const newAppointment = await appointment.create({
        ...entry,
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return newAppointment;
    } catch (error) {
    // Handle the error, e.g., log it, throw a custom error, etc.
      console.error('Error saving appointment:', error);
      throw error; // Re-throw the error for upper layers to handle
    }
  }

  static async updateIsCompleted(value, id) {
    await appointment.update({
      isCompleted: value,
      updatedAt: new Date()
    },
    {
      where: { id }
    }
    )
  }

  static async deleteAppointment(id) {
    await appointment.destroy({ where: { id } });
  }
}

export default appointmentDB
