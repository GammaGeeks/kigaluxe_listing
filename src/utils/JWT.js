import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import tokenDB from './db/tokenDB';
import models from '../database/models';

const { token } = models;

dotenv.config();

/**
 * This class contains.
 * three methods, one to help hashing password (hashPassword).
 * other the second to retrieve hashed password.
 * and the last one for generating validToken.
 */
class TokenHelper {
  /**
   * Hashs the password.
   * @param {string} password The user's password.
   * @returns {string} The users's hashed password.
   */

  // eslint-disable-next-line require-jsdoc
  static createJWT(id, email, password) {
    const secretKey = `${process.env.SECRET_KEY}`;
    const payload = {
      id,
      email,
      password
    };
    // Generate the token
    // eslint-disable-next-line no-shadow
    const token = jwt.sign(payload, secretKey);

    return token;
  }

  /**
   * Hashs the password.
   * @param {string} validToken The user's validToken.
   * @param {string} secrectKey The secret key.
   * @returns {string} The users's hashed password.
   */
  static decodedToken(validToken, secrectKey) {
    const isToken = jwt.verify(validToken, secrectKey);
    return isToken;
  }
}
export default TokenHelper
