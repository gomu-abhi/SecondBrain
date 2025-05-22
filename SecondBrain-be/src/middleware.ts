import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Extend the Request type to include `id`
interface AuthRequest extends Request {
  id?: string;
}

function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).json({ message: "No token provided." });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    if (decoded && decoded.id) {
      req.id = decoded.id;
      next();
    } else {
      res.status(401).json({ message: "Invalid token payload." });
      return;
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
    return;
  }
}


export {
    jwt,
    auth,
    JWT_SECRET
}