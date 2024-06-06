import { DB_CONFIG } from "../../configrations.js";
import { getConnection } from "./connectMysql.js";

export const createProductTable = async () => {
  const connection = await getConnection(DB_CONFIG);

  const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        price DECIMAL(10, 2) NOT NULL
      );
    `;

  await connection.query(createTableQuery);
  await connection.end();
};
