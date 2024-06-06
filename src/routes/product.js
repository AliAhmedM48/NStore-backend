import e from "express";
import { getConnection } from "../models/connectMysql.js";
import { DB_CONFIG } from "../../configrations.js";
import {
  createProduct,
  deleteOne,
  updateProduct,
} from "../controllers/product.js";
//
//
const router = e.Router();

router.get("/products", async (req, res, next) => {
  let connection;
  try {
    connection = await getConnection(DB_CONFIG);
    const [rows, fields] = await connection.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database query error" });
  } finally {
    await connection.end();
  }
});

router.post("/product", async (req, res, next) => {
  await createProduct(req.body);
  res.status(201).json("Product created successfully.");
});

router.put("/product", async (req, res, next) => {
  await updateProduct(req.body);
  res.status(201).json("Product updated successfully.");
});

router.delete("/product/:id", async (req, res, next) => {
  await deleteOne(req.params.id);
  res.status(201).json("Product deleted successfully.");
});

export { router };
