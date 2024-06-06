import { DB_CONFIG, TABLES_NAMES } from "../../configrations.js";
import { getConnection } from "../models/connectMysql.js";

export const createProduct = async (product) => {
  const connection = await getConnection(DB_CONFIG);

  const insertQuery = `
        INSERT INTO ${TABLES_NAMES.products} (name, description, image, price)
        VALUES (?, ?, ?, ?)
    `;

  const { name, description, image, price } = product;

  try {
    const result = await connection.query(insertQuery, [
      name,
      description,
      image,
      price,
    ]);
  } catch (error) {
    console.error("Error creating product:", error);
  } finally {
    await connection.end();
  }
};

export const updateProduct = async (product) => {
  const connection = await getConnection(DB_CONFIG);
  const updateQuery = `
    UPDATE ${TABLES_NAMES.products}
    SET name=?, description=?, image=?, price=?
    WHERE id=?
`;

  const { id, name, description, image, price } = product;
  try {
    const result = await connection.query(updateQuery, [
      name,
      description,
      image,
      price,
      id,
    ]);
  } catch (error) {
    console.error("Error updating product:", error);
  } finally {
    await connection.end();
  }
};

export const deleteOne = async (id) => {
  const connection = await getConnection(DB_CONFIG);
  const deleteQuery = `
      DELETE FROM ${TABLES_NAMES.products}
      WHERE id=?
  `;

  try {
    const result = await connection.query(deleteQuery, [id]);
  } catch (error) {
    console.error("Error deleting product:", error);
  } finally {
    await connection.end();
  }
};
