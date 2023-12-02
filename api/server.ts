import express from "express";
import { createPool } from "mysql";
import cors from "cors";
import "dotenv/config";

//router
import { userRouter } from "./routers/user";

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

app.use("/api/v1/user", userRouter);

//MySQLとの接続確認
app.get("/mysql", (req, res) => {
    Pool.getConnection((err, con) => {
        if (err) return res.status(500).json({ message: "MySQLとの接続ができません" });
        console.log("MySQLと接続中...");

        con.release();
        return res.status(200).json({ message: "OK" });
    });
});

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
