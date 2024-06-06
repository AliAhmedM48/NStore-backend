import e from "express";
import cors from "cors";
//
import { router } from "./src/routes/product.js";
import { DB_CONFIG, PORT } from "./configrations.js";
import { initializeMySQL } from "./src/models/connectMysql.js";
import morgan from "morgan";

const app = e();

app.use(morgan("dev"));
app.use(cors());
app.use(e.json());
app.use("/api", router);

app.listen(PORT, async () => {
  await initializeMySQL(DB_CONFIG);
  console.log(`Server running at http://localhost:${PORT}/`);
});
