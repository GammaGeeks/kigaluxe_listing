/* eslint-disable require-jsdoc */
import bcrypt from 'bcrypt'

/**
 * Check the password.
 * @param {string} req The request string
 * @param {string} res The response string
 * @returns {string} The hasher of the password.
 */

export const passwordHashing = async (req, res, next) => {
  req.password = await bcrypt.hash(req.body.password, 10)
  next()
}

export const passwordcheck = async (passedpw, hashedpw) => {
  const hasher = await bcrypt.compare(passedpw, hashedpw)
  return hasher
}
