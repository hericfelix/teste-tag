import dotenv from 'dotenv';
import { JWTConfig } from '../ts/interfaces';
import multer, { diskStorage } from 'multer';

dotenv.config();

console.log(process.env.SECRET_KEY);

export const jwtConfig: JWTConfig = {
  secretKey: process.env.SECRET_KEY,
  expiresIn: process.env.EXPIRES_IN,
};

jwtConfig;

export const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

export const upload = multer({ storage: diskStorage({}) });
