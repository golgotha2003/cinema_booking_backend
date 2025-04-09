import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (email: string, role: string): string => {
  const JWT_KEY = process.env.JWT_KEY as string;
  return jwt.sign({ email: email , role: role}, JWT_KEY, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): any => {
  const JWT_KEY = process.env.JWT_KEY as string;
  return jwt.verify(token, JWT_KEY);
};