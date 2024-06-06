import dotenv from "dotenv";
dotenv.config();

export const DB_CONFIG = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
};

export const TABLES_NAMES = {
  products: process.env.PRODUCTS,
};

export const PORT = process.env.PORT || 3000;
