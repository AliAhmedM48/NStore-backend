import { createProductTable } from "./product.js";

export const createDbTables = async () => {
  try {
    await createProductTable();
    console.log("Product table created successfully.");
  } catch (error) {
    console.error("Error creating product table:", error);
  }
};
