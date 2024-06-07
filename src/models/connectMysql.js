import mysql from "mysql2/promise";
import { createDbTables } from "./createDbTables.js";

const initializeMySQL = async (dbConfig) => {
  console.log({ dbConfig });
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
  });

  try {
    const [rows] = await connection.query("SHOW DATABASES");
    const existingDatabases = rows.map((row) => row.Database.toLowerCase());
    if (existingDatabases.includes(dbConfig.database.toLowerCase())) {
      console.log(`Database ${dbConfig.database} already exists.`);
    } else {
      console.log(`Database ${dbConfig.database} does not exist.`);
      await connection.query(
        `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`
      );
      console.log(`Database ${dbConfig.database} created successfully!`);
    }
    await createDbTables();
    console.log(`Tables created successfully!`);
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await connection.end();
  }
};

const getConnection = async (dbConfig) => {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
};

export { initializeMySQL, getConnection };
