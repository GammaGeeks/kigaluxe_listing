import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import UserDB from '../utils/db/userDB';

dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const jwtoken = authHeader && authHeader.split(' ')[1];

    if (!jwtoken) {
      return res.status(401).json({ error: 'Access token is missing or invalid' });
    }

    jwt.verify(jwtoken, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
      }

      req.user = decoded; // Attach the decoded user to the request object
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export default verifyToken;
