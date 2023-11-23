import express from "express";
import { createPool } from "mysql";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 8080;

//MySQL
export const Pool = createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "sns-sample",
    port: 3306
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
