import multer from 'multer'
import crypto from 'crypto'
import userDB from '../utils/db/userDB';
import tokenDB from '../utils/db/tokenDB';
import JWT from '../utils/JWT';
import { passwordcheck } from '../utils/passwordHasher';
import s3_helper from '../utils/s3_helper';

/**
 * This class contains all methods
 * required to handle
 * signup and login and logout endpoints' request.
 */
class AuthController {
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async signUp(req, res) {
    const data = {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      profileImg: req.body.profileImg || null,
      password: req.password,
    }
    let newuser
    const finder = await userDB.findUser('email', req.body.email)
    if (!finder) {
      newuser = await userDB.saveUser(data)
      const find = await userDB.findUser('email', req.body.email)
      // const value = await JWT.generateResetPasswordToken(newuser.id, newuser.email, newuser.password)
      const value = JWT.createJWT(newuser.id, newuser.email, newuser.password)
      tokenDB.saveToken(value, await newuser.id)
      return res.status(201).json({
        status: "201",
        message: "user created successfully",
        user: newuser,
        token: value
      })
    }

    return res.status(401).json({
      status: "401",
      error: "email already exist"
    })
  }

  /**
   * This method handle the sign request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async signIn(req, res) {
    const emailExists = await userDB.findUser('email', req.body.email);

    if (emailExists) {
      const passwordExist = await passwordcheck(req.body.password, emailExists.password)
      if (passwordExist) {
        const value = JWT.createJWT(emailExists.id, emailExists.email, emailExists.password, emailExists.role)
        const newuser = await tokenDB.findToken(emailExists.id);
        if (newuser.userId) {
          tokenDB.updateToken(value, newuser.userId)
          return res.status(201).json({
            status: 201,
            message: 'User has successfully logged in',
            token: value,
            user: {
              profileImg: emailExists.profileImg,
              lastName: emailExists.lastName,
              firstName: emailExists.firstName,
              email: emailExists.email,
              phoneNumber: emailExists.phoneNumber,
            }
          })
        }
      } else {
        return res.status(404).json({
          status: "404",
          error: "invalid email or password"
        })
      }
    }
    return res.status(404).json({
      status: "404",
      error: "invalid email or password"
    })
  }

  /**
   * This method handle the logout endpoint.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and message.
   * */
  static async logout(req, res) {
    const authHeader = req.headers.authorization;
    const jwtoken = authHeader && authHeader.split(' ')[1];
    const test = await tokenDB.deleteToken(jwtoken)
    return res.status(200).json({
      status: 200,
      message: `${jwtoken} successfully deleted.`,
    });
  }

  // eslint-disable-next-line require-jsdoc
  static async profile(req, res) {
    if (req.file && req.file.buffer) {
      const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
      const checkImg = await userDB.findUser('email', req.user.email)
      const key = checkImg.profileImg == null ? `${randomImageName()}` : checkImg.profileImg
      const test = s3_helper.s3_objPut(key, req.file.buffer, req.file.mimetype)
      await userDB.updateUser(req.user.id, "profileImg", key)
      res.status(200).json({
        status: 200,
        message: "profile pic updated successfully"
      })
    } else {
      res.status(400).json({
        status: 400,
        error: "file can't be empty"
      })
    }
  }

  // eslint-disable-next-line require-jsdoc
  static async loadProfImg(req, res) {
    const checkImg = await userDB.findUser('email', req.user.email)
    const url = await s3_helper.generateUrl(checkImg.profileImg)
    res.status(200).json({
      status: 200,
      imgUrl: url
    })
  }
}

export default AuthController
