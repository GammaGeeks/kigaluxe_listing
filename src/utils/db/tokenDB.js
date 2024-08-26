import models from '../../database/models';

const { token } = models;

/**
 * class to deal with all needed operations
 * on the token table
 */
class TokenDB {
  /**
   * find token into table in the DB
   * @param {string} userId
   * @returns {string} The users's token.
   */
  static async findToken(userId) {
    const holder = await token.findOne({
      where: { userId }
    });
    return holder
  }

  /**
   * insert generated token into table in the DB.
   * @param {string} jwtToken The token for user.
   * @param {integer} userId The user id.
   * @returns {string} The users's token.
   */
  static async saveToken(jwtToken, userId) {
    await token.create({
      value: jwtToken,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  /**
   * insert generated token into table in the DB.
   * @param {string} jwtoken The token for user.
   * @param {integer} userId The user id.
   * @returns {string} The users's token.
   */
  static async updateToken(jwtoken, userId) {
    await token.update({
      value: jwtoken,
      updatedAt: new Date()
    },
    {
      where: { userId }
    }
    )
  }

  // eslint-disable-next-line require-jsdoc
  static async deleteToken(jwtoken) {
    await token.update({ value: null }, { where: { value: jwtoken } })
  }

  /**
   * delete token from validtoken table in the DB.
   * @param {string} jwtToken The request sent by a user.
   * @returns {string} The users's token.
   */
  static async deleteValidToken(jwtToken) {
    await token.destroy({ where: { value: jwtToken } });
  }
}

export default TokenDB
