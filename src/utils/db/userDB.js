/* eslint-disable require-jsdoc */
import { where } from 'sequelize';
import models from '../../database/models';

const {
  user,
  token,
  verification_code
} = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the user's data
 */
class UserDB {
  /**
   * Finds the user's email if he/she exists.
   * @param {string} attr users table field.
   * @param {string} val value to be found.
   * @returns {object} The users's data.
   */
  static async findUser(attr, val) {
    const userExists = await user.findOne({
      where: { [attr]: val },
      include:
      [
        {
          model: token,
          as: 'token',
          attributes: ['id', 'value']
        }
      ]
    });
    return userExists;
  }

  /**
   * Finds the user's username if he/she exists.
   * @param {string} email users table field.
   * @returns {object} The users's data.
   */
  static async confirm(email) {
    const verifiedUser = await user.update({ isVerified: true }, { where: { email } });
    return verifiedUser;
  }

  /**
   * Saves the user in the DB.
   * @param {object} entry The request sent by a user.
   * @returns {object} The users's data.
   */
  static async saveUser(entry) {
    const acceptedUser = await user.create(
      {
        ...entry, createdAt: new Date(), updatedAt: new Date()
      },
    );
    return acceptedUser;
  }
  /**
   * Updates a specific column for a user.
   * @param {number} id The user's id.
   * @param {string} column The column to be updated.
   * @param {string|number|boolean} value The new value for the column.
   * @returns {object} The updated user's data.
   */

  static async updateUser(id, column, value) {
    const updatedUser = await user.update(
      { [column]: value },
      { where: { id } }
    );
    return updatedUser;
  }
}

export default UserDB
